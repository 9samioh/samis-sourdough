export const scaleRecipeTool = {
  type: "function" as const,
  name: "scale_recipe",
  description:
    "Retrieve a sourdough recipe and scale its ingredient quantities to a requested number of servings. Use this when a user wants to make more or fewer loaves or servings of an existing recipe.",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      slug: {
        type: "string",
        description: "The unique slug of the recipe to scale.",
      },
      targetServings: {
        type: "integer",
        description: "The number of servings the user wants.",
      },
    },
    required: ["slug", "targetServings"],
    additionalProperties: false,
  },
};
