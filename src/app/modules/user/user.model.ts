import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";
const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  //hashing the pass
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post empty string after saving password
UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("Users", UserSchema);
