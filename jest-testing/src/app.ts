import express from "express";
import z from "zod";

const app = express();
app.use(express.json());

// Define the Zod schema for validating the input
const sumInput = z.object({
  a: z.number(), // `a` must be a number
  b: z.number(), // `b` must be a number
});

app.get("/sum", (req, res) => {
  // Validate the request body using the Zod schema
  const userInputs = sumInput.safeParse(req.body);

  // If validation fails, respond with status 411 and an error message
  if (!userInputs.success) {
    res.status(411).json({ message: "Invalid Inputs" });
  }

  // Extract validated input values
  const a = req.body.a;
  const b = req.body.b;

  res.json({ answer: a + b });
});

export { app };
