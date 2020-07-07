require("dotenv").config();
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserController } from "../models/user/controller";
import { PassportStatic } from "passport";

module.exports = (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("x-api-key"),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (email_from_token, done) => {
        try {
          const user = await UserController.fetUserAfterJWTToeknAuthentication(
            email_from_token
          );
          return done(null, user.toJSON());
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );
};
