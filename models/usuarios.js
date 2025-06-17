const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 


const Usuario = sequelize.define(
  "Usuario",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perfil_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    interesses: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    projetos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantidade_observacoes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);



module.exports = Usuario;
