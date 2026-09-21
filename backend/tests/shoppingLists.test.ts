import request from "supertest";
import app from "../index";

test("GET /shopping-lists", async () => {
    const response = await request(app).get("/shopping-lists");
    expect(response.status).toBe(200);
});