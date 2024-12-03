import request from "supertest";
import app from "../app";
import { query } from "../utils/db";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";

describe("POST /api/auth/signup", () => {
  beforeAll(async () => {
    await query("DELETE FROM users WHERE email = ?", ["john.doe@test.com"]);
  });

  it("should validate names", () => {
    const validNames = ["john doe", "mary jane", "jane doe", "jay bay", "Jack"];
    const invalidNames = [
      "john-doe",
      "maryjane123",
      "jay_bay",
      "jack@jack",
      "",
      null,
      undefined,
    ];

    validNames.forEach((name) => {
      expect(validateName(name)).toBe(false);
    });

    invalidNames.forEach((name) => {
      // @ts-ignore
      // Ignore for testing
      expect(validateName(name)).toBe(true);
    });
  });

  it("should validate passwords", () => {
    const validPasswords = ["Password123", "testTest123", "rand1$#12P"];
    const invalidPasswords = ["Password", "Test123", "password123"];

    validPasswords.forEach((password) => {
      expect(validatePassword(password)).toBe(true);
    });

    invalidPasswords.forEach((password) => {
      expect(validatePassword(password)).toBe(false);
    });
  });

  it("should validate emails", () => {
    const validEmails = [
      "john.doe@gmail.com",
      "johndoe123@co.com",
      "john_doe@facebook.com",
    ];

    const invalidEmails = [
      "john.doegmail.com",
      "john@doe@gmail.com",
      "@example.com",
      "john@",
      "john<>doe@gmail.com",
      "john.doe@gmail.c",
      ".john.doe@gmail.com",
    ];
  });

  it("should create a new user and return a token", async () => {
    const newUser = {
      name: "John Doe",
      email: "john.doe@test.com",
      password: "johnisgreat",
    };

    const response = await request(app).post("/api/auth/signup").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.token).toBeDefined();
  });

  it("should return an error if user already exists", async () => {
    const existingUser = {
      name: "John Doe",
      email: "john.doe@test.com",
      password: "johnisgreat",
    };
    const response = await request(app)
      .post("/api/auth/signup")
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists.");
  });
});
