require("dotenv").config();
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersController } from "../models/user/controller";
import { PassportStatic } from "passport";

module.exports = (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("x-api-key"),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (data, done) => {
        const { id } = data;

        if (!id) {
          done(null, {});
        }

        try {
          const user = await UsersController.getUserById(id);
          if (!user) {
            done(null, {});
          }
          return done(null, user.toJSON());
        } catch (e) {
          done(e, {});
          throw new Error("Invalid useer");
        }
      }
    )
  );
};
