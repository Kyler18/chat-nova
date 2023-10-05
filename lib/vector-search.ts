import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore, SupabaseFilterRPCCall } from "langchain/vectorstores/supabase";


export const Retriever = async (title: string) => {

    const FilterA: SupabaseFilterRPCCall = (rpc) =>
    rpc
    .filter("metadata->pdf->info->>Title", "eq", title);

    const client = createClientComponentClient();
    const embeddings = new OpenAIEmbeddings();
    const vectorstore = new SupabaseVectorStore(embeddings, {client, tableName: "documents", queryName: "match_documents", filter: FilterA});
    const vectorStoreRetriever = vectorstore.asRetriever();
    
    return vectorStoreRetriever;
};  

export const QuestionPrompt =  `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;