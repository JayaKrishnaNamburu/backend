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
      async (data, done) => {
        const { email: email_from_token } = data;

        if (!email_from_token) {
          throw new Error("Invalid User");
        }

        try {
          const user = await UserController.fetUserAfterJWTToeknAuthentication(
            email_from_token
          );

          if (!user) {
            // Users email is missing for the db
            throw new Error("Invalid user");
          }

          return done(null, user.toJSON());
        } catch (e) {
          done(e, false);
          throw new Error("Invalid useer");
        }
      }
    )
  );
};
