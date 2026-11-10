import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(cors({
    origin: "http://localhost:3000",
}));
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
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
