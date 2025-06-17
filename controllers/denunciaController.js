const Denuncia = require("../models/denuncia");
const Usuario = require("../models/usuarios");

exports.listarDenuncia = async (req, res) => {
  try {
    const denuncias = await Denuncia.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
      order: [["data_denuncia", "DESC"]],
    });

    res.json(denuncias);
  } catch (error) {
    console.error("Erro ao buscar denúncias:", error);
    res.status(500).json({ erro: "Erro ao buscar denúncias" });
  }
};

exports.buscarDenuncia = async (req, res) => {
  const { id } = req.params;
  try {
    const denuncia = await Denuncia.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
    });

    if (!denuncia) {
      return res.status(404).json({ erro: "Denúncia não encontrada" });
    }

    res.json(denuncia);
  } catch (error) {
    console.error("Erro ao buscar denúncia:", error);
    res.status(500).json({ erro: "Erro ao buscar denúncia" });
  }
};

exports.criarDenuncia = async (req, res) => {
  const { tipo, referencia_id, motivo } = req.body;
  const usuario_id = req.user?.id;
  const status = "pendente";

  if (!tipo || !referencia_id || !motivo) {
    return res
      .status(400)
      .json({ erro: "Preencha todos os campos obrigatórios" });
  }

  try {
    const denuncia = await Denuncia.create({
      usuario_id,
      tipo,
      referencia_id,
      motivo,
      status,
      data_denuncia: new Date(),
    });

    res.status(201).json({
      mensagem: "Denúncia criada com sucesso!",
      denuncia,
    });
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    res.status(500).json({ erro: "Erro ao criar denúncia" });
  }
};

exports.atualizarDenuncia = async (req, res) => {
  const { id } = req.params;
  const { motivo, status } = req.body;

  if (!motivo || !status) {
    return res.status(400).json({ erro: "Motivo e status são obrigatórios" });
  }

  try {
    const [atualizado] = await Denuncia.update(
      { motivo, status },
      { where: { id } }
    );

    if (atualizado === 0) {
      return res.status(404).json({ erro: "Denúncia não encontrada" });
    }

    res.json({ mensagem: "Denúncia atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar denúncia:", error);
    res.status(500).json({ erro: "Erro ao atualizar denúncia" });
  }
};

exports.deletarDenuncia = async (req, res) => {
  const { id } = req.params;

  try {
    const deletado = await Denuncia.destroy({ where: { id } });

    if (deletado === 0) {
      return res.status(404).json({ erro: "Denúncia não encontrada" });
    }

    res.json({ mensagem: "Denúncia excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir denúncia:", error);
    res.status(500).json({ erro: "Erro ao excluir denúncia" });
  }
};
