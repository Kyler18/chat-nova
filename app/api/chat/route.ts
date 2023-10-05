import { Retriever, QuestionPrompt } from "@/lib/vector-search";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { AIMessage, HumanMessage } from "langchain/schema";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;
  const { stream, handlers } = LangChainStream();
  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-16k",
    streaming: true,
  });
  const nonStreamingLLM = new ChatOpenAI({ modelName: "gpt-3.5-turbo-16k" });
  const chat_history = (messages as Message[]).map((m) =>
    m.role == "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
  );
  const vectorStoreRetriever = await Retriever(body.selectedOption);
  const lastMessage = messages[messages.length - 1].content;
  const qa_chain = ConversationalRetrievalQAChain.fromLLM(
    llm,
    vectorStoreRetriever,
    {
      questionGeneratorChainOptions: {
        llm: nonStreamingLLM,
        template: QuestionPrompt,
      },
    }
  );
  qa_chain.call(
    { question: lastMessage, chat_history: chat_history },
    { callbacks: [handlers] }
  );

  return new StreamingTextResponse(stream);
}
