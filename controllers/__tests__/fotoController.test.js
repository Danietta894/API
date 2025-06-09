const request = require("supertest");
const app = require("../../app"); 

describe("Rotas de Fotos", () => {
  it("Deve listar fotos aprovadas", async () => {
    const response = await request(app).get("/api/fotos");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  afterAll(() => {
    const db = require("../../config/db");
    db.end(); 
  });

});


