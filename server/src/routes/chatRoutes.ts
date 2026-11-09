import { Router } from "express";
import { openai } from "../lib/openai.js";
import { scaleRecipe } from "../tools/scaleRecipe.js";
import { scaleRecipeTool } from "../tools/recipeTools.js";

const router = Router();

const instructions = `
  You are Loaf, a friendly and knowledgeable sourdough baking assistant.

  Help users learn about sourdough, baking techniques, ingredients,
  recipes, and troubleshooting.

  Be encouraging, approachable, and informative.
  Explain baking concepts clearly, especially for beginners.

  When users ask to scale an existing recipe, use the scale_recipe tool.
  Never invent recipe ingredients or quantities.
  Use the recipe data returned by the tool when answering.
`;

router.post("/", async (req, res, next) => {
  try {
    const { messages } = req.body;

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      !messages.every(
        (msg) =>
          (msg.role === "user" || msg.role === "assistant") &&
          typeof msg.content === "string" &&
          msg.content.trim().length > 0
      )
    ) {
      return res.status(400).json({
        status: "error",
        message: "Valid conversation messages are required.",
      });
    }

    const model = process.env.OPENAI_MODEL || "gpt-5.5";

    // Send conversation to OpenAI with available tools
    let response = await openai.responses.create({
      model,
      instructions,
      input: messages,
      tools: [scaleRecipeTool],
    });

    // Handle tool calls - allows loaf to use tools autonomously
    while (true) {
      const toolOutputs = [];

      for (const item of response.output) {
        // Only process function calls
        if (item.type !== "function_call") continue;

        if (item.name !== "scale_recipe") {
          toolOutputs.push({
            type: "function_call_output" as const,
            call_id: item.call_id,
            output: JSON.stringify({
              error: "Unknown tool",
            }),
          });

          continue;
        }

        // OpenAI provides function args as a json string
        const args = JSON.parse(item.arguments) as {
          slug: string;
          targetServings: number;
        };

        const result = await scaleRecipe(args.slug, args.targetServings);

        // call_id tells OpenAI which function request this belongs to
        toolOutputs.push({
          type: "function_call_output" as const,
          call_id: item.call_id,
          output: JSON.stringify(result),
        });
      }

      // Stop if OpenAI didn't request any more tools (in response to our function call)
      if (toolOutputs.length === 0) break;

      // Send tool results back to OpenAI
      response = await openai.responses.create({
        model,
        instructions,
        previous_response_id: response.id,
        input: toolOutputs,
        tools: [scaleRecipeTool],
      });
    }

    res.json({
      status: "success",
      reply: response.output_text,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
