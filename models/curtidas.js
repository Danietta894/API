const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Curtida = sequelize.define(
  "Curtida",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "curtidas",
    timestamps: false,
  }
);

module.exports = Curtida;
