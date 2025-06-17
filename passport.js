const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Usuario = require("./models/usuarios");
const bcrypt = require("bcrypt");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const nome = profile.displayName;

      try {
        let usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
          const senhaCriptografada = await bcrypt.hash(profile.id, 10);
          usuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada,
            perfil_id: 3, // Usuário padrão
          });
        }

        return done(null, usuario);
      } catch (error) {
        console.error("Erro no Passport Google:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
