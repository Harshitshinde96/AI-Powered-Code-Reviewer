// src/controllers/ai.controller.ts
// @ts-ignore
import { generateContent } from "../services/ai.service.js"; // include .js extension
import { ExpressHandler } from "../types/express.js";

export const getReview: ExpressHandler = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("Prompt is Required");
  }

  const response = await generateContent(code);

  res.send(response);
  return;
};
