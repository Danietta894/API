const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Perfil = sequelize.define(
  "Perfil",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "perfis",
    timestamps: false,
  }
);

module.exports = Perfil;


