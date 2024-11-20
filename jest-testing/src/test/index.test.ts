import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import { app } from "../app";

// Group related test cases for the `/sum` endpoint
describe("Testing sum endpoint", () => {
  // Test case 1: Valid input should return the correct sum
  it("should return 2 + 2 equal to 4", async () => {
    // Use Supertest to make a GET request to the /sum endpoint
    const res = await request(app).get("/sum").send({ a: 2, b: 2 });

    // Assert that the response body contains the correct answer
    expect(res.body.answer).toBe(4);
  });

  // Test case 2: Invalid input should return an error message
  it("Should return error Invalid Input", async () => {
    // Use Supertest to make a GET request with invalid input data
    const res = await request(app).get("/sum").send({ a: "2", b: "2" });

    // Assert that the response body contains the error message
    expect(res.body.message).toBe("Invalid Inputs");
  });
});
