import type { Embedder, LLM } from "./types";
import { OpenAIProvider } from "./openai";

export const enum LLMProvider {
  OpenAI = "openai",
  Claude = "claude",
}

const providers = new Map<string, LLM>([
  [LLMProvider.OpenAI, new OpenAIProvider()],
  //TODO [LLMProvider.Claude, new ClaudeProvider()],
]);

const embeddingProviders = new Map<string, Embedder>([
  [LLMProvider.OpenAI, new OpenAIProvider()],
]);

export function getLLM(providerKey: LLMProvider = LLMProvider.OpenAI): LLM {
  const provider = providers.get(providerKey);
  if (!provider) throw new Error(`LLM provider "${providerKey}" not found`);
  return provider;
}

export function getEmbedder(
  providerKey: LLMProvider = LLMProvider.OpenAI,
): Embedder {
  const provider = embeddingProviders.get(providerKey);
  if (!provider)
    throw new Error(`Embedder provider "${providerKey}" not found`);
  return provider;
}
