import request from "supertest";
import app from "../app";

describe("POST /api/auth/signup", () => {
  it("should create a new user and return a token", async () => {
    const newUser = {
      fullname: "John Doe",
      email: "john.doe@example.com",
      password: "johnisgreat",
    };

    const response = await request(app).post("/api/auth/signup").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.token).toBeDefined();
  });

  it("should return an error if user already exists", async () => {
    const existingUser = {
      fullname: "John Doe",
      email: "john.doe@example.com",
      password: "johnisgreat",
    };
    const response = await request(app)
      .post("/api/auth/signup")
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists.");
  });
});
