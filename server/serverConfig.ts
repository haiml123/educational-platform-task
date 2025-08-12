export const ServerConfig = {
  host: process.env.NEXT_PUBLIC_HOST!,
  defaultUserId: process.env.NEXT_PUBLIC_DEFAULT_USER_ID!,
  scopeLabsEndpoint: process.env.SCOPE_LABS_ENDPOINT!,
  qdrant: {
    key: process.env.QDRANT_KEY,
    url: process.env.QDRANT_URL,
  },
  openai: {
    embeddingModel: process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small",
    miniModel: process.env.OPENAI_MINI_MODEL || "gpt-5-mini",
    chatModel: process.env.OPENAI_CHAT_MODEL || "gpt-5",
    key: process.env.OPENAI_KEY!,
  },
};
