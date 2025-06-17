const Validacao = require("../models/validacao");
const Foto = require("../models/fotos");
const Usuario = require("../models/usuarios");

exports.getImagensPendentes = async (req, res) => {
  try {
    const imagens = await Foto.findAll({
      include: [
        {
          model: Validacao,
          as: "validacao",
          where: { status: "pendente" },
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
      order: [["criado_em", "DESC"]],
    });

    res.json(
      imagens.map((imagem) => {
        const foto = imagem.get({ plain: true });
        foto.nome_usuario = imagem.usuario.nome;
        delete foto.usuario; 
        delete foto.validacao

        return foto;
      })
    );
  } catch (erro) {
    console.error("Erro ao buscar imagens pendentes:", erro);
    res.status(500).json({ erro: "Erro ao buscar imagens pendentes" });
  }
};

exports.aprovarImagem = async (req, res) => {
  const { id } = req.params;
  const { tipo, observacao } = req.body;
  const moderador_id = req.user?.id;

  try {
    const [atualizouValidacao] = await Validacao.update(
      {
        status: "aprovada",
        moderador_id,
        observacao: observacao || null,
        data_validacao: new Date(),
      },
      { where: { foto_id: id } }
    );

    if (atualizouValidacao === 0) {
      return res.status(404).json({ erro: "Validação não encontrada" });
    }

    await Foto.update({ tipo: tipo || "", status: "ativo" }, { where: { id } });

    res.json({ mensagem: "Imagem aprovada com sucesso!" });
  } catch (erro) {
    console.error("Erro ao aprovar imagem:", erro);
    res.status(500).json({ erro: "Erro ao aprovar imagem" });
  }
};

exports.recusarImagem = async (req, res) => {
  const { id } = req.params;
  const { observacao } = req.body;
  const moderador_id = req.user?.id;

  try {
    const [atualizouValidacao] = await Validacao.update(
      {
        status: "recusada",
        moderador_id,
        observacao: observacao || null,
        data_validacao: new Date(),
      },
      { where: { foto_id: id } }
    );

    if (atualizouValidacao === 0) {
      return res.status(404).json({ erro: "Validação não encontrada" });
    }

    await Foto.update({ status: "recusada" }, { where: { id } });

    res.json({ mensagem: "Imagem recusada com sucesso!" });
  } catch (erro) {
    console.error("Erro ao recusar imagem:", erro);
    res.status(500).json({ erro: "Erro ao recusar imagem" });
  }
};
