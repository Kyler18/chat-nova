/**
 * This file defines an API route for uploading vector data to a Supabase store.
 * It accepts a PDF file in the request body, splits the text into chunks, 
 * generates embeddings for each chunk using OpenAI, and stores the results in Supabase.
 */

import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import fs from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { Readable } from "stream";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Promisify the pipeline function for async/await usage
const streamPipeline = promisify(pipeline);

// Function to convert a stream into an async iterable
async function* streamToAsyncIterable(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

// POST handler function for the API route
export async function POST(req: NextRequest) {
  const file = req.body;
  try {
    // Create a Supabase client
    const client = createClientComponentClient();
    
    // Check if the request body is null
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is null" },
        { status: 400 }
      );
    }

    // Create a temporary file path for the PDF
    const tempFilePath = join(tmpdir(), "temp.pdf");
    const writeStream = fs.createWriteStream(tempFilePath);
    const nodeReadable = Readable.from(streamToAsyncIterable(req.body));

    // Write the PDF file to the temporary path
    await streamPipeline(nodeReadable, writeStream);

    // Load the PDF file
    const loader = new PDFLoader(tempFilePath);
    const docs = await loader.load();

    // Split the text of the PDF into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 0,
    });
    const splitDocuments = await splitter.splitDocuments(docs);
    
    // Generate embeddings for each chunk and store them in Supabase
    await SupabaseVectorStore.fromDocuments(
      splitDocuments,
      new OpenAIEmbeddings(),
      { client, tableName: "documents", queryName: "match_documents" }
    );
    
    // Return a success response
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    // Log the error and return an error response
    console.error(e.stack);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}