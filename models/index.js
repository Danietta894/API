const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Usuario = require("./usuarios");
const Perfil = require("./perfis");
const Moderador = require("./moderador");
const Atividade = require("./atividades");
const Foto = require("./fotos");
const Comentario = require("./comentarios");
const Curtida = require("./curtidas");
const Validacao = require("./validacao");
const Denuncia = require("./denuncia");


Usuario.belongsTo(Perfil, { foreignKey: "perfil_id", as: "perfil" });
Perfil.hasMany(Usuario, { foreignKey: "perfil_id", as: "usuarios" });

Moderador.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Usuario.hasOne(Moderador, { foreignKey: "usuario_id", as: "moderador" });

Atividade.belongsTo(Moderador, { foreignKey: "moderador_id", as: "moderador" });
Moderador.hasMany(Atividade, { foreignKey: "moderador_id", as: "atividades" });

Foto.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Usuario.hasMany(Foto, { foreignKey: "usuario_id", as: "fotos" });

Comentario.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Comentario.belongsTo(Foto, { foreignKey: "foto_id", as: "foto" });

Foto.hasMany(Comentario, { foreignKey: "foto_id", as: "comentarios" });
Usuario.hasMany(Comentario, { foreignKey: "usuario_id", as: "comentarios" });

Curtida.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Curtida.belongsTo(Foto, { foreignKey: "foto_id", as: "foto" });

Foto.hasMany(Curtida, { foreignKey: "foto_id", as: "curtidas" });
Usuario.hasMany(Curtida, { foreignKey: "usuario_id", as: "curtidas" });

Validacao.belongsTo(Foto, { foreignKey: "foto_id", as: "foto" });
Foto.hasOne(Validacao, { foreignKey: "foto_id", as: "validacao" });

Validacao.belongsTo(Usuario, { foreignKey: "moderador_id", as: "moderador" });

Denuncia.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Usuario.hasMany(Denuncia, { foreignKey: "usuario_id", as: "denuncias" });



module.exports = {
  sequelize,
  Sequelize,
  Usuario,
  Perfil,
  Moderador,
  Atividade,
  Foto,
  Comentario,
  Curtida,
  Validacao,
  Denuncia,
};
