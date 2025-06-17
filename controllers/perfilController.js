const Perfil = require("../models/perfil");

exports.listarPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.findAll();
    res.json(perfis);
  } catch (error) {
    console.error("Erro ao buscar perfis:", error);
    res.status(500).json({ erro: "Erro ao buscar perfis" });
  }
};

exports.buscarPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    const perfil = await Perfil.findByPk(id);

    if (!perfil) {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }

    res.json(perfil);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ erro: "Erro ao buscar perfil" });
  }
};

exports.criarPerfil = async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  try {
    const perfil = await Perfil.create({ nome });
    res.status(201).json({
      mensagem: "Perfil criado com sucesso!",
      perfil,
    });
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    res.status(500).json({ erro: "Erro ao criar perfil" });
  }
};

exports.atualizarPerfil = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const [atualizado] = await Perfil.update({ nome }, { where: { id } });

    if (atualizado === 0) {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }

    res.json({ mensagem: "Perfil atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ erro: "Erro ao atualizar perfil" });
  }
};

exports.deletarPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    const deletado = await Perfil.destroy({ where: { id } });

    if (deletado === 0) {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }

    res.json({ mensagem: "Perfil excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir perfil:", error);
    res.status(500).json({ erro: "Erro ao excluir perfil" });
  }
};
