// This file provides functionality for retrieving document vectors from a Supabase store based on a given title.
// It also provides a question prompt template for rephrasing a follow-up question into a standalone question.

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore, SupabaseFilterRPCCall } from "langchain/vectorstores/supabase";

// The Retriever function retrieves document vectors from a Supabase store based on a given title.
export const Retriever = async (title: string) => {
    // FilterA is a filter function that matches documents where the title equals the provided title.
    const FilterA: SupabaseFilterRPCCall = (rpc) =>
    rpc
    .filter("metadata->pdf->info->>Title", "eq", title);

    // Create a client for the Supabase store.
    const client = createClientComponentClient();
    // Initialize OpenAI embeddings.
    const embeddings = new OpenAIEmbeddings();
    // Create a vector store with the client, embeddings, and filter.
    const vectorstore = new SupabaseVectorStore(embeddings, {client, tableName: "documents", queryName: "match_documents", filter: FilterA});
    // Get a retriever for the vector store.
    const vectorStoreRetriever = vectorstore.asRetriever();
    
    return vectorStoreRetriever;
};  

// QuestionPrompt is a template for rephrasing a follow-up question into a standalone question.
export const QuestionPrompt =  `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

export const FinalQuestionPrompt =
    `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
  ----------------
  CHAT HISTORY: {chatHistory}
  ----------------
  CONTEXT: {context}
  ----------------
  QUESTION: {question}
  ----------------
  Helpful Answer:`;