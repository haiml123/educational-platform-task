/**
 * Alternative version with examples
 * @param userQuery - The original user search query
 * @returns Enhanced prompt with JSON structure and examples
 */
export function enhanceQueryPrompt(userQuery: string): string {
  return `Enhance this search query for video search. Add synonyms and related terms.

Query: "${userQuery}"

Example:
Query: "python loops"
{
  "title": "python loops for while iteration tutorial",
  "description": "python programming loops iteration control structures for loop while loop coding tutorial guide examples"
}

Return JSON:`;
}
