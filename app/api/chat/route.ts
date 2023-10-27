// This file is responsible for handling the POST request to the chat API.
// It uses the LangChainStream to process and stream text responses.
// The main function, POST, receives the request body and extracts the messages.
// Then, it constructs the chat history and sets up the ConversationalRetrievalQAChain.
// Finally, it calls the QA chain with the last message and chat history, and returns a streaming text response.

// Importing necessary modules and functions
import { Retriever, QuestionPrompt, FinalQuestionPrompt } from "@/lib/vector-search"; // For vector search functionality
import { StreamingTextResponse, LangChainStream, Message } from "ai"; // For AI related operations
import { ChatOpenAI } from "langchain/chat_models/openai"; // For OpenAI chat model
import { ConversationalRetrievalQAChain } from "langchain/chains"; // For QA chain operations
import { AIMessage, HumanMessage } from "langchain/schema"; // For message schema

// Setting the runtime environment
export const runtime = "edge";

// The main POST function
export async function POST(req: Request) {
  // Parsing the request body
  const body = await req.json();
  const { messages } = body;

  // Setting up the LangChainStream
  const { stream, handlers } = LangChainStream();

  // Initializing the ChatOpenAI with streaming enabled
  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-16k",
    streaming: true,
  });
  if (body.selectedOption == "No Document") {
    llm
      .call(
        (messages as Message[]).map(m =>
          m.role == 'user'
            ? new HumanMessage(m.content)
            : new AIMessage(m.content),
        ),
        {},
        [handlers],
      )
      .catch(console.error);
  } else {
    // Initializing the ChatOpenAI without streaming
    const nonStreamingLLM = new ChatOpenAI({ modelName: "gpt-3.5-turbo-16k" });

    // Constructing the chat history
    const chat_history = (messages as Message[]).map((m) =>
      m.role == "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
    );

    // Setting up the Retriever with the selected option
    const vectorStoreRetriever = await Retriever(body.selectedOption);

    // Getting the last message from the chat
    const lastMessage = messages[messages.length - 1].content;

    // Setting up the ConversationalRetrievalQAChain
    const qa_chain = ConversationalRetrievalQAChain.fromLLM(
      llm,
      vectorStoreRetriever,
      {
        qaChainOptions:{type: "map_reduce"},
        qaTemplate: FinalQuestionPrompt,
        questionGeneratorChainOptions: {
          llm: nonStreamingLLM,
          template: QuestionPrompt,
        },
      }
    );
    // Calling the QA chain with the last message and chat history
    qa_chain.call(
      { question: lastMessage, chat_history: chat_history },
      { callbacks: [handlers] }
    );
  }

  // Returning a streaming text response
  return new StreamingTextResponse(stream);
}