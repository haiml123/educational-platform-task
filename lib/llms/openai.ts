import OpenAI from "openai";
import { LLM, ChatMsg, JsonSchema, Embedder } from "./types";
import { ServerConfig } from "@/server/serverConfig";
import { ResponseFormatTextConfig } from "openai/resources/responses/responses";

type ImplOpts = {
  messages: ChatMsg[];
  temperature?: number;
  maxTokens?: number;
  schema?: JsonSchema;
};

export class OpenAIProvider implements LLM, Embedder {
  name = "openai";
  private client: OpenAI;

  constructor(apiKey = ServerConfig.openai.key) {
    if (!apiKey) throw new Error("Missing OPENAI_API_KEY");
    this.client = new OpenAI({ apiKey });
  }

  async chat(opts: ImplOpts): Promise<string> {
    return this.send(ServerConfig.openai.chatModel!, opts);
  }

  async chatMini<T>(opts: ImplOpts): Promise<T> {
    return this.send(ServerConfig.openai.miniModel, opts);
  }

  private async send(
    model: string,
    { messages, temperature = 0.2, maxTokens, schema }: ImplOpts,
  ) {
    const res = await this.client.responses.create({
      service_tier: "priority",
      model,
      input: messages,
      max_output_tokens: maxTokens,
      ...(schema && {
        text: {
          format: {
            type: "json_schema",
            ...schema,
          } as ResponseFormatTextConfig,
        },
      }),
    });
    return JSON.parse(res.output_text) ?? {};
  }

  async embed(text: string[]): Promise<number[][]> {
    const response = await this.client.embeddings.create({
      model: ServerConfig.openai.embeddingModel,
      input: text,
    });

    return response.data.map((data) => data.embedding);
  }
}
