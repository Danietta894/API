const validaCampos = require("./validaCampos");

test("Validação com todos os campos preenchidos deve ser TRUE", () => {
  const resultado = validaCampos({
    descricao: "Nuvem bonita",
    localizacao: "São Paulo",
    longitude: "-46.6333",
    latitude: "-23.5505",
    fotografado_em: "2025-05-23",
  });

  expect(resultado).toBe(true);
});

test("Validação deve ser FALSE se faltar a descrição", () => {
  const resultado = validaCampos({
    descricao: "",
    localizacao: "São Paulo",
    longitude: "-46.6333",
    latitude: "-23.5505",
    fotografado_em: "2025-05-23",
  });

  expect(resultado).toBe(false);
});

test("Validação deve ser FALSE se faltar a localização", () => {
  const resultado = validaCampos({
    descricao: "Nuvem bonita",
    localizacao: "",
    longitude: "-46.6333",
    latitude: "-23.5505",
    fotografado_em: "2025-05-23",
  });

  expect(resultado).toBe(false);
});
