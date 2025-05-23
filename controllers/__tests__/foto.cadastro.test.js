const request = require("supertest");
const app = require("../../app");

describe("Fotos - Cadastro", () => {
  it("Deve cadastrar uma foto com sucesso", async () => {
    const response = await request(app)
      .post("/api/fotos")
      .field("descricao", "Foto de teste")
      .field("localizacao", "Teste City")
      .field("longitude", "123.456")
      .field("latitude", "-78.910")
      .field("fotografado_em", "2025-05-23")
      .attach("imagem", "controllers/__tests__/arquivos/imagem_teste.jpg");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.descricao).toBe("Foto de teste");
  });
});
