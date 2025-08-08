// src/app.ts
import express, { Request, Response } from "express";
import aiRoutes from "./routes/ai.routes.js"; // must include .js

const app = express();

app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);

export default app;
