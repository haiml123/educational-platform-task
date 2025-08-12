export type ChatMsg = {
  role: "system" | "user" | "assistant";
  content: string;
};
export type JsonSchema = Record<string, unknown>;

export interface LLM {
  name: string;

  chat(opts: {
    messages: ChatMsg[];
    temperature?: number;
    maxTokens?: number;
  }): Promise<string>;
  chat(opts: {
    messages: ChatMsg[];
    schema: JsonSchema;
    temperature?: number;
    maxTokens?: number;
  }): Promise<string>;

  chatMini(opts: {
    messages: ChatMsg[];
    temperature?: number;
    maxTokens?: number;
  }): Promise<string>;
  chatMini<T>(opts: {
    messages: ChatMsg[];
    schema: JsonSchema;
    temperature?: number;
    maxTokens?: number;
  }): Promise<T>;
}

export interface Embedder {
  embed(text: string | string[]): Promise<number[][]>;
}
