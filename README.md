<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.freecodecamp.org/">
    <img src="./public/glow.png" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">
    Kickstart Your Own ChatGPT Clone in Just 5 Minutes
  </h2>

  <p align="center">
    Chat Nova will help you to build a custom AI Chatbot with full authentication and database management flow in a just few minutes
    <br />
    <a href="https://www.chatnova.co"><strong>What is Chat Nova »</strong></a>
    <br />
    <br />
    <a href="https://www.chatnova.co">View Demo</a>
    ·
    <a href="https://github.com/Kyler18/chat-nova/issues">Request Feature</a>
    ·
    <a href="https://github.com/Kyler18/chat-nova/issues">Report Bug</a>
  </p>

[![React](https://img.shields.io/badge/-React-blue?logo=React)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/-Next.js-black?logo=Next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-white?logo=TypeScript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/-Supabase-0057FF?logo=Supabase)](https://supabase.io/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-000000?logo=Tailwind-CSS)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-red?logo=Framer)](https://www.framer.com/api/motion/)


</div>

<div align="center">

![Thumbnail](./public/og.png)

</div>

## Introduction

Chat Nova is a full-stack chatbot that allows you to build a custom AI chatbot with full authentication and database management flow in a just few minutes. It is built with React, Next.js, TypeScript, Supabase, Tailwind CSS, and Framer Motion.

## Setup environment variables

1. Create `env.local` file inside the root directory of the project, and add the following environment variables:

   ```bash
   OPENAI_API_KEY= <YOUR API KEY HERE>
   NEXT_PUBLIC_SUPABASE_URL= <SUPABASE URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY= <ANON KEY>
   SUPABASE_SERVICE_KEY= <SERVICE KEY>
   ```
2. Generate a new OpenAI API key: [OpenAI Docs](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key).

3. Generate Supabase API keys, and service key: [Supabase Docs](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#get-the-api-keys).

## Setup Supabase Database

Once you have successfully setup the environment variables, you can now setup the Supabase database. Follow these steps:

### Users Table

1. Open Supabase SQL Editor, and run the following SQL query to create the users table:

   ```sql
   create table
     public.users (
       id uuid not null,
       created_at timestamp with time zone not null default now(),
       email text not null,
       avatar_url text null,
       role text not null default 'user'::text,
       constraint users_pkey primary key (id),
       constraint users_id_fkey foreign key (id) references auth.users (id) on update cascade on    delete cascade
     ) tablespace pg_default;
    ```

2. Create PostgreSQL Function to create user:

   ```sql
   create function public.create_profile_for_user()
   returns trigger
   language plpgsql
   security definer set search_path = public
   as $$
   begin
       insert into public.users (id, email, avatar_url)
       values (
         new.id,
         new.raw_user_meta_data->'email',
         new.raw_user_meta_data->'avatar_url'
       );
       return new;
   end;
   $$;
   ```

3. Create PostgreSQL Trigger to create profile:

   ```sql
   create trigger on_auth_user_created
     after insert on auth.users
     for each row execute procedure public.create_profile_for_user();
   ```

### Chats Table

Open Supabase SQL Editor, and run the following SQL query to create the chats table:

```sql
create table
  public.chats (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    user_id uuid not null,
    title text null,
    constraint chats_pkey primary key (id),
    constraint chats_user_id_fkey foreign key (user_id) references users (id) on update cascade on delete cascade
  ) tablespace pg_default;
```

Once you create the chats table, you need to create the necessary RLS policies for this table. ( What is RLS? [Supabase Docs](https://supabase.com/docs/guides/auth/row-level-security) )

1. authenticated users can create new chats:

   ```sql
   CREATE POLICY "authenticated users can create new chats" ON "public"."chats"
   AS PERMISSIVE FOR INSERT
   TO authenticated

   WITH CHECK (user_id = auth.uid())
   ```   

2. authenticated users can delete their own chat:

   ```sql
   CREATE POLICY "authenticated users can delete their own chat" ON "public"."chats"
   AS PERMISSIVE FOR DELETE
   TO authenticated
   USING (user_id = auth.uid())
   ```  

3. authenticated users can update their own chats:

   ```sql
   CREATE POLICY "authenticated users can update their own chats" ON "public"."chats"
   AS PERMISSIVE FOR UPDATE
   TO authenticated
   USING (user_id = auth.uid())
   WITH CHECK (user_id = auth.uid())
   ```   

3. authenticated users can view their own chats:

   ```sql
   CREATE POLICY "authenticated users can view their own chats" ON "public"."chats"
   AS PERMISSIVE FOR SELECT
   TO authenticated
   USING (user_id = auth.uid())
   ```   

## Run Locally

To run this project in your local development environment, follow
these steps:

1. Clone the repository to your local machine.

   ```bash
   git@github.com:Kyler18/chat-nova.git
   ```

2. Open the cloned folder in your preferred code editor, install the required
   dependencies by running the following command in the terminal:

   ```bash
   npm install
   ```

3. Start the development server by running the following command:

   ```bash
   npm run dev
   ```

You are now ready to go!

## Contribute to this project

Thank you for browsing this repo. Any contributions you make are **greatly
appreciated**.

If you have a suggestion that would make this better, please fork the repo and
create a pull request. You can also simply open an issue with the tag
"enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
