const db = require("../config/db");

const Curtida = require("../models/curtidas");
const Usuario = require("../models/usuarios");

exports.listarCurtidas = async (req, res) => {
  const { foto_id } = req.params;

  try {
    const curtidas = await Curtida.findAll({
      where: { foto_id },
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
    });

    res.json(curtidas);
  } catch (error) {
    console.error("Erro ao buscar curtidas:", error);
    res.status(500).json({ erro: "Erro ao buscar curtidas" });
  }
};


exports.adicionarCurtida = async (req, res) => {
  const { foto_id } = req.body;
  const usuario_id = req.user?.id; 

  if (!foto_id) {
    return res.status(400).json({ erro: "Foto é obrigatória" });
  }

  try {
   
    const curtidaExistente = await Curtida.findOne({
      where: { usuario_id, foto_id },
    });

    if (curtidaExistente) {
      return res.status(400).json({ erro: "Você já curtiu essa foto" });
    }

    const novaCurtida = await Curtida.create({ usuario_id, foto_id });

    res.status(201).json({
      mensagem: "Curtida adicionada com sucesso!",
      curtida: novaCurtida,
    });
  } catch (error) {
    console.error("Erro ao adicionar curtida:", error);
    res.status(500).json({ erro: "Erro ao curtir a foto" });
  }
};


exports.removerCurtida = async (req, res) => {
  const { foto_id } = req.body;
  const usuario_id = req.user?.id; // Obtido do token JWT

  if (!foto_id) {
    return res.status(400).json({ erro: "Foto é obrigatória" });
  }

  try {
    const linhasAfetadas = await Curtida.destroy({
      where: { usuario_id, foto_id },
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Curtida não encontrada" });
    }

    res.json({ mensagem: "Curtida removida com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover curtida:", error);
    res.status(500).json({ erro: "Erro ao remover curtida" });
  }
};

exports.contarCurtidas = async (req, res) => {
  const { foto_id } = req.params;

  try {
    const total = await Curtida.count({
      where: { foto_id },
    });

    res.json({ total });
  } catch (error) {
    console.error("Erro ao contar curtidas:", error);
    res.status(500).json({ erro: "Erro ao contar curtidas" });
  }
};
