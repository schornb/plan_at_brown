import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User, IUser } from "../models/User";

// Convert the user database model to an id for passport
passport.serializeUser((user, done) => {
  done(null, (user as IUser)._id);
});

// Convert the id back to a user database model
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const { sub, name, email, picture, given_name, family_name } = profile._json;

        const user = await User.findOneAndUpdate(
          {
            googleId: sub,
          },
          {
            $set: {
              googleId: sub,
              name,
              email,
              picture,
              givenName: given_name,
              familyName: family_name,
            },
          },
          {
            new: true,
            upsert: true,
          }
        );

        return done(null, user);
      } catch (err: any) {
        return done(err);
      }
    }
  )
);
