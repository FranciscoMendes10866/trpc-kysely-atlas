import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { db } from "./db";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  return {
    req,
    res,
    db,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
