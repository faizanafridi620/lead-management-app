import request from "supertest";
import app from "../app.js";

describe("Lead API", () => {
  let token = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "one@one.com",
        password: "123456",
      });

    token = login.body.token;
  });

  test("Authenticated user can create a lead", async () => {
    const res = await request(app)
      .post("/api/leads")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Lead",
        email: "testlead@gmail.com",
      });

    expect(res.statusCode).toBe(201);

    expect(res.body.success).toBe(true);

    expect(res.body.lead.name).toBe("Test Lead");
  });
});