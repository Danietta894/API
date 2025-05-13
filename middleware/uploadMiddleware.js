const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // garante que a pasta uploads existe
  },
  filename: (req, file, cb) => {
    const nome = Date.now() + path.extname(file.originalname);
    cb(null, nome);
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }); // Limite de 5MB
exports.upload = upload;
