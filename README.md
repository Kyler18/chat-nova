# Vercel AI SDK, Next.js, LangChain, OpenAI Chat Bot

This chatbot uses the [Vercel AI SDK](https://sdk.vercel.ai/docs) with [Next.js](https://nextjs.org/), [LangChain](https://js.langchain.com), [OpenAI](https://openai.com), and [SupaBase](https://supabase.com/docs) to create a ChatGPT-like AI-powered streaming chat bot with the ability to talk with your PDF documents.


To run the bot locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. Set the required OpenAI environment variable as the token value as shown [the example env file](./.env.local.example) but in a new file called `.env.local`.
4. You need to execute the SQL query file located in the root directory in a supabase database query.
5. You'll need to set up your RLS policies in Authentication > Policies. 
6. After executing the query navigate to project settings > API to get the required keys specified in the .env.local.example file.
7. `npm install` to install the required dependencies.
8. `npm run dev` to launch the development server.

## Learn More

To learn more about LangChain, OpenAI, Next.js, and the Vercel AI SDK take a look at the following resources:

- [Vercel AI SDK docs](https://sdk.vercel.ai/docs) - learn mode about the Vercel AI SDK
- [Vercel AI Playground](https://play.vercel.ai) - compare and tune 20+ AI models side-by-side
- [LangChain Documentation](https://js.langchain.com/docs) - learn about LangChain
- [OpenAI Documentation](https://platform.openai.com/docs) - learn about OpenAI features and API.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [SupaBase Documentation](https://supabase.com/docs) - learn about Supabase.
