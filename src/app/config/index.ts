import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  db_uri: process.env.DATABASE_URL,
  port: process.env.SERVER_PORT,
  bcrypt_salt_rounds: process.env.BRYCPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
};
