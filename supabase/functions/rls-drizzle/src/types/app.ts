import { DrizzleTransaction } from "../db/index.ts";

export type AppEnv = {
  Variables: {
    userId: string;
    db: DrizzleTransaction;
  };
};
