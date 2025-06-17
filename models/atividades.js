const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Moderador = require("./moderador");

const Atividade = sequelize.define(
  "Atividade",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moderador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao_atividade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "atividades_moderador",
    timestamps: false,
  }
);




module.exports = Atividade;
