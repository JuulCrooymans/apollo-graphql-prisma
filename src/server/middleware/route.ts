import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import passport from "../lib/passport";

// setup sessions and cookie parser
export const handler = nc<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .use(passport.session());
