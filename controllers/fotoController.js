const Foto = require("../models/fotos");
const { Validacao, Usuario } = require("../models");
const { Op } = require("sequelize");

exports.criarFoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada." });
  }

  const { descricao, localizacao, longitude, latitude, fotografado_em, tipo } =
    req.body;
  const usuario_id = req.user?.id;

  if (
    !descricao ||
    !localizacao ||
    !longitude ||
    !latitude ||
    !fotografado_em
  ) {
    return res
      .status(400)
      .json({ erro: "Preencha todos os campos obrigatórios." });
  }

  try {
    const foto = await Foto.create({
      url: `/uploads/${req.file.filename}`,
      descricao,
      tipo: tipo || "",
      usuario_id,
      localizacao,
      longitude,
      latitude,
      fotografado_em,
      criado_em: new Date(),
      status: "pendente",
    });

    await Validacao.create({
        foto_id: foto.id,
        moderador_id: null,
        status: "pendente",
      });

    res.status(201).json({
      mensagem: "Foto cadastrada com sucesso!",
      foto,
    });
  } catch (erro) {
    console.error("Erro ao criar foto:", erro);
    res.status(500).json({ erro: "Erro no servidor ao salvar a foto." });
  }
};

exports.listarFotosAprovadas = async (req, res) => {
  const { pagina = 1, limite = 10, tipo } = req.query;
  const offset = (pagina - 1) * limite;

  try {
    const fotos = await Foto.findAll({
      where: {
        ...(tipo ? { tipo } : {}),
      },
      include: [
        {
          model: Validacao,
          as: "validacao",
          where: { status: "aprovada" },
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
      limit: +limite,
      offset: +offset,
      order: [["criado_em", "DESC"]],
    });

    res.json(fotos);
  } catch (erro) {
    console.error("Erro ao buscar fotos aprovadas:", erro);
    res.status(500).json({ erro: "Erro ao buscar as fotos" });
  }
};

exports.listarFotosDoUsuario = async (req, res) => {
  const usuario_id = req.user.id;

  try {
    const fotos = await Foto.findAll({
      where: { usuario_id },
      order: [["criado_em", "DESC"]],
    });

    res.json(fotos);
  } catch (erro) {
    console.error("Erro ao buscar fotos do usuário:", erro);
    res.status(500).json({ erro: "Erro ao buscar as fotos" });
  }
};

exports.listarFotosPendentesDoUsuario = async (req, res) => {
  const usuario_id = req.user.id;

  try {
    const fotos = await Foto.findAll({
      where: {
        usuario_id,
      },
      include: [
        {
          model: Validacao,
          as: "validacao",
          where: { status: "pendente" },
        },
      ],
      order: [["criado_em", "DESC"]],
    });

    res.json(fotos);
  } catch (erro) {
    console.error("Erro ao buscar fotos pendentes:", erro);
    res.status(500).json({ erro: "Erro ao buscar as fotos" });
  }
};

exports.listarFotosPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const foto = await Foto.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
    });

    if (!foto) {
      return res.status(404).json({ erro: "Foto não encontrada" });
    }

    res.json(foto);
  } catch (erro) {
    console.error("Erro ao buscar foto:", erro);
    res.status(500).json({ erro: "Erro ao buscar a foto" });
  }
};

exports.atualizarFoto = async (req, res) => {
  const { id } = req.params;
  const { url, descricao, tipo } = req.body;

  try {
    const [linhasAfetadas] = await Foto.update(
      { url, descricao, tipo },
      { where: { id } }
    );

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Foto não encontrada" });
    }

    res.json({ mensagem: "Foto atualizada com sucesso!" });
  } catch (erro) {
    console.error("Erro ao atualizar foto:", erro);
    res.status(500).json({ erro: "Erro ao atualizar a foto" });
  }
};

exports.deletarFoto = async (req, res) => {
  const { id } = req.params;

  try {
    const linhasAfetadas = await Foto.destroy({
      where: { id },
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Foto não encontrada" });
    }

    res.json({ mensagem: "Foto excluída com sucesso!" });
  } catch (erro) {
    console.error("Erro ao excluir foto:", erro);
    res.status(500).json({ erro: "Erro ao excluir a foto" });
  }
};
