import request from "supertest"
import app from "../app.js"

describe("Authentication", () => {
    test("User can login with valid credentials", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "one@one.com",
            password: "123456"
        })

        console.log(res.body);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    })
})