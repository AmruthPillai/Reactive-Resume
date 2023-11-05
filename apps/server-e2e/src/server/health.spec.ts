import axios from "axios";

describe("GET /api/health", () => {
  it("should return a status 'ok'", async () => {
    const res = await axios.get(`/health`);

    expect(res.status).toBe(200);
    expect(res.data).toMatchObject({ status: "ok" });
  });
});
