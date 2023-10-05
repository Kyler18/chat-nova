import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function chatTitle(message: string){

    const supabase = createClientComponentClient();

    
    const model = new OpenAI({ temperature: 0 });
    const prompt = PromptTemplate.fromTemplate(
        `Read the following message: {message} and then create a short 1-3 word title that represents the message topic.`
        );
        const chain = new LLMChain({ llm: model, prompt });
        const response = await chain.call({message: message});
        // const { data: res } = await supabase
        //     .from("chats")
        //     .update()
        //     .eq
        return response;
    }