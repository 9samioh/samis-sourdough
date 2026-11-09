import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes.js";
import { prisma } from "./lib/prisma.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// api routes
app.use("/api/recipes", recipeRoutes);

// First API endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Bread backend is running!",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();

    res.json({
      status: "success",
      message: "Database connected!",
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.get("/api/test-error", async (req, res) => {
  throw new Error("Testing centralized error handling");
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
