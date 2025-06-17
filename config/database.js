const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mynuvemlens", "root", "root", {
  host: "localhost",
  dialect: "mysql",

  logging: true,
  define: {
    timestamps: false,
  },
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
})();

module.exports = sequelize;
