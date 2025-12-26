import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";

const authRouter = Router();
const SALT_ROUNDS = 10;

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return secret;
};

const buildUserPayload = (user: { user_handle: string; username: string; email: string }) => ({
  user_handle: user.user_handle,
  username: user.username,
  email: user.email,
});


// handle user signup
// takes in user_handle, username, email, and password (all required)
authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { user_handle, username, email, password } = req.body;

    // check for missing fields
    if (!user_handle || !username || !email || !password) {
      console.warn("Signup rejected: missing fields", { hasHandle: Boolean(user_handle), hasUsername: Boolean(username), hasEmail: Boolean(email) });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // normalize handle and email to lowercase
    const normalizedHandle = String(user_handle).toLowerCase();
    const normalizedEmail = String(email).toLowerCase();

    console.log("Signup attempt", { user_handle: normalizedHandle, email: normalizedEmail });


    //checks if handle exists
    const existingHandle = await UserModel.findOne({ user_handle: normalizedHandle }).lean();
    if (existingHandle) {
      console.warn("Signup conflict: user handle taken", { user_handle: normalizedHandle });
      return res.status(409).json({ message: "User handle already exists" });
    }

    //checks if email exists
    const existingEmail = await UserModel.findOne({ email: normalizedEmail }).lean();
    if (existingEmail) {
      console.warn("Signup conflict: email already registered", { email: normalizedEmail });
      return res.status(409).json({ message: "Email already registered" });
    }

    // i love bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create user in db
    const createdUser = await UserModel.create({
      user_handle: normalizedHandle,
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // i love jsonwebtokens
    const token = jwt.sign({ sub: createdUser.user_handle }, getJwtSecret(), { expiresIn: "1h" });

    console.log("Signup success", { user_handle: createdUser.user_handle });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: buildUserPayload(createdUser),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "JWT_SECRET is not configured") {
      console.error("Signup error: JWT secret missing");
      return res.status(500).json({ message: error.message });
    }
    console.error("Signup error", error);
    return res.status(500).json({ message: "Unable to sign up user" });
  }
});


// handle user signin
// takes in user_handle or email along with password
authRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const { user_handle, email, password } = req.body;

    // check for missing credentials
    if (!password || (!user_handle && !email)) {
      console.warn("Signin rejected: missing credentials", { hasHandle: Boolean(user_handle), hasEmail: Boolean(email), hasPassword: Boolean(password) });
      return res.status(400).json({ message: "Provide credentials and password" });
    }

    // create lookup request payload
    const lookup = user_handle
      ? { user_handle: String(user_handle).toLowerCase() }
      : { email: String(email).toLowerCase() };

    console.log("Signin attempt", lookup);

    // fetch user from db
    const userDoc = await UserModel.findOne(lookup);

    if (!userDoc) {
      console.warn("Signin failed: user not found", lookup);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // i love bcrypt x 2
    const isPasswordValid = await bcrypt.compare(password, userDoc.password);

    if (!isPasswordValid) {
      console.warn("Signin failed: invalid password", { user_handle: userDoc.user_handle });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ sub: userDoc.user_handle }, getJwtSecret(), { expiresIn: "1h" });

    console.log("Signin success", { user_handle: userDoc.user_handle });

    return res.status(200).json({
      message: "Signed in successfully",
      token,
      user: buildUserPayload(userDoc),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "JWT_SECRET is not configured") {
      console.error("Signin error: JWT secret missing");
      return res.status(500).json({ message: error.message });
    }
    console.error("Signin error", error);
    return res.status(500).json({ message: "Unable to sign in" });
  }
});

export default authRouter;
