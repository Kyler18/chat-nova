create table
  public.chats (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    user_id uuid not null,
    title text null,
    constraint chats_pkey primary key (id),
    constraint chats_user_id_fkey foreign key (user_id) references users (id) on update cascade on delete cascade
  ) tablespace pg_default;

  -- Enable the pgvector extension to work with embedding vectors
create extension vector;

-- Create a table to store your documents
create table documents (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed
);

-- Create a function to search for documents
create function match_documents (
  query_embedding vector(1536),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    (embedding::text)::jsonb as embedding,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

create table
  public.messages (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    role text not null,
    content text not null,
    chat_id uuid not null,
    user_id uuid not null,
    constraint messages_pkey primary key (id),
    constraint messages_chat_id_fkey foreign key (chat_id) references chats (id) on update cascade on delete cascade,
    constraint messages_user_id_fkey foreign key (user_id) references users (id) on update cascade on delete cascade
  ) tablespace pg_default;

  create table
  public.users (
    id uuid not null,
    created_at timestamp with time zone not null default now(),
    email text not null,
    avatar_url text null,
    role text not null default 'user'::text,
    constraint users_pkey primary key (id),
    constraint users_id_fkey foreign key (id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;