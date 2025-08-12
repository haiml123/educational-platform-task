export const enhanceQuerySchema = {
  name: "enhanced_video_search_query",
  schema: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description:
          "An enhanced search title containing synonyms and related terms.",
      },
      description: {
        type: "string",
        description:
          "A detailed, keywords-focused description containing synonyms, related phrases, and example uses for the query.",
      },
    },
    required: ["title", "description"],
    additionalProperties: false,
  },
  strict: true,
};
