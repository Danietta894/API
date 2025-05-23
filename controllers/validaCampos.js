function validaCampos(dados) {
  const { descricao, localizacao, longitude, latitude, fotografado_em } = dados;

  if (
    !descricao ||
    !localizacao ||
    !longitude ||
    !latitude ||
    !fotografado_em
  ) {
    return false;
  }
  return true;
}

module.exports = validaCampos;
