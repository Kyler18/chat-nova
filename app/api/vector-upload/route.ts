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


const streamPipeline = promisify(pipeline);

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

export async function POST(req: NextRequest) {
  const file = req.body;
  try {
    const client = createClientComponentClient();
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is null" },
        { status: 400 }
      );
    }

    const tempFilePath = join(tmpdir(), "temp.pdf");
    const writeStream = fs.createWriteStream(tempFilePath);
    const nodeReadable = Readable.from(streamToAsyncIterable(req.body));

    await streamPipeline(nodeReadable, writeStream);

    const loader = new PDFLoader(tempFilePath);
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 0,
    });
    const splitDocuments = await splitter.splitDocuments(docs);
    
    await SupabaseVectorStore.fromDocuments(
      splitDocuments,
      new OpenAIEmbeddings(),
      { client, tableName: "documents", queryName: "match_documents" }
    );
    
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error(e.stack);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}