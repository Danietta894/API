const db = require("../config/db");
const Comentario = require("../models/comentarios");
const Usuario = require("../models/usuarios");
// Listar todos os comentários
const listarComentarios = async (req, res) => {
  const { foto_id } = req.query;

  try {
    const where = foto_id ? { foto_id } : {};

    const comentarios = await Comentario.findAll({
      where,
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
      order: [["data_comentario", "DESC"]],
    });

    res.json(comentarios.map((comentario) => ({
      id: comentario.id,
      usuario_id: comentario.usuario_id,
      foto_id: comentario.foto_id,
      texto: comentario.texto,
      data_comentario: comentario.data_comentario,
      nome: comentario.usuario.nome,
    })));
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({ erro: "Erro ao buscar comentários" });
  }
};

const buscarComentario = async (req, res) => {
  const { id } = req.params;

  try {
    const comentario = await Comentario.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nome"],
        },
      ],
    });

    if (!comentario) {
      return res.status(404).json({ erro: "Comentário não encontrado" });
    }

    res.json(comentario);
  } catch (error) {
    console.error("Erro ao buscar comentário:", error);
    res.status(500).json({ erro: "Erro ao buscar comentário" });
  }
};



const criarComentario = async (req, res) => {
  const { foto_id, texto } = req.body;
  const usuario_id = req.user?.id;

  if (!foto_id || !texto) {
    return res
      .status(400)
      .json({ erro: "Preencha todos os campos obrigatórios." });
  }

  try {
    const comentario = await Comentario.create({
      usuario_id,
      foto_id,
      texto,
      data_comentario: new Date(),
    });

    res.status(201).json({
      mensagem: "Comentário criado com sucesso!",
      comentario,
    });
  } catch (erro) {
    console.error("Erro ao salvar comentário:", erro);
    res.status(500).json({ erro: "Erro ao salvar comentário" });
  }
};


const atualizarComentario = async (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: "O campo texto é obrigatório." });
  }

  try {
    const [linhasAfetadas] = await Comentario.update(
      { texto },
      { where: { id } }
    );

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Comentário não encontrado" });
    }

    res.json({ mensagem: "Comentário atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar o comentário:", error);
    res.status(500).json({ erro: "Erro ao atualizar o comentário" });
  }
};

const deletarComentario = async (req, res) => {
  const { id } = req.params;

  try {
    const linhasAfetadas = await Comentario.destroy({ where: { id } });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Comentário não encontrado" });
    }

    res.json({ mensagem: "Comentário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir o comentário:", error);
    res.status(500).json({ erro: "Erro ao excluir o comentário" });
  }
};


module.exports = {
  listarComentarios,
  buscarComentario,
  criarComentario,
  atualizarComentario,
  deletarComentario,
};
