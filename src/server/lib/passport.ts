import passport from "passport";
import { Strategy } from "passport-local";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(async (email, password, done) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return done(null, false);

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return done(null, false);

    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  // @ts-ignore todo: fix
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (user) return done(null, user);

  done(null, false);
});

export default passport;
