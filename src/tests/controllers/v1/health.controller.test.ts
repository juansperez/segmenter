import request from "supertest";
import { app } from "../../test.config";

describe("GET /health - a simple api endpoint", () => {
  afterAll(() => app.close());

  it("Health API Request", async () => {
    const result = await request(app).get("/v1/health");

    expect(result.status).toEqual(200);
  });
});
