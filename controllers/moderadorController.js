const Atividade = require("../models/atividade");
const Moderador = require("../models/moderador");

exports.listarAtividades = async (req, res) => {
  const usuarioId = req.user.id;

  try {
    const atividades = await Atividade.findAll({
      include: [
        {
          model: Moderador,
          as: "moderador",
          where: { usuario_id: usuarioId },
          attributes: [],
        },
      ],
      order: [["data", "DESC"]],
    });

    res.json(atividades);
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    res.status(500).json({ erro: "Erro ao buscar atividades" });
  }
};
