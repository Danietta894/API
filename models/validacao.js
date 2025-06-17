const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Foto = require("./fotos");
const Usuario = require("./usuarios");

const Validacao = sequelize.define(
  "Validacao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    foto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pendente",
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data_validacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    moderador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "validacao",
    timestamps: false,
  }
);


module.exports = Validacao;
