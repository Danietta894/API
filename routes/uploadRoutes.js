const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const { upload } = require("../middleware/uploadMiddleware"); // ✅ Importa do middleware

// ✅ Usa o middleware com a configuração correta
router.post("/", upload.single("imagem"), uploadController.uploadImagem);

module.exports = router;
