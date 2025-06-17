const Atividade = require("../models/atividades");
const Moderador = require("../models/moderador");

exports.listarAtividades = async (req, res) => {
  const { moderadorId } = req.params;

  try {
    const atividades = await Atividade.findAll({
      where: { moderador_id: moderadorId },
      include: [
        {
          model: Moderador,
          as: "moderador",
          attributes: ["id", "nome_exibicao"],
        },
      ],
      order: [["data", "DESC"]],
      limit: 10,
    });

    res.json(atividades);
  } catch (erro) {
    console.error("Erro ao buscar atividades:", erro);
    res.status(500).json({ erro: "Erro ao buscar atividades" });
  }
};
