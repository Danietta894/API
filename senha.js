const bcrypt = require('bcrypt');
console.log(bcrypt.hashSync('12345', 10)); // Hash gerado: $2b$10$3C
