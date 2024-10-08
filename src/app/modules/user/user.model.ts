import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
const UserSchema = new Schema<TUser, UserModel>(
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

UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isStatusBlocked = async function (status: string) {
  return await User.findOne({ status: status === "blocked" });
};

export const User = model<TUser, UserModel>("Users", UserSchema);
