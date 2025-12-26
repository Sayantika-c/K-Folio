import { Schema, model, models, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    // handles mongodb schema and type validation

    // unique user handle
    user_handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Real name of the user
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ user_handle: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = models.User || model("User", userSchema);
