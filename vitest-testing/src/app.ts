import express from "express";
import z from "zod";
import { db } from "./prismaClient/db";

const app = express();
app.use(express.json());

// Define the Zod schema for validating the input
const sumInput = z.object({
  a: z.number(), // `a` must be a number
  b: z.number(), // `b` must be a number
});

// @ts-ignore
app.post("/sum", async (req, res) => {
  // Validate the request body using the Zod schema
  const userInputs = sumInput.safeParse(req.body);

  // If validation fails, respond with status 411 and an error message
  if (!userInputs.success) {
    return res.status(411).json({ message: "Invalid Inputs" });
  }

  // Extract validated input values
  const a = req.body.a;
  const b = req.body.b;
  const answer = a + b;

  await db.sum.create({
    data: { a: a, b: b, result: answer },
  });

  return res.json({ answer });
});

export { app };
