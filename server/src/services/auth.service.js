import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
export const registerUser = async (data) => {
  const { firstName, lastName, email, password, role } = data;

  // check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
    role,
    avatarInitials:
      firstName[0] + (lastName ? lastName[0] : ""),
  });

  return user;
};

export const loginUser = async (data) => {
  const { email, password } = data;

  // find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // generate token
  const token = generateToken(user._id);

  return {
    _id: user._id,
    name: user.firstName,
    email: user.email,
    token,
  };
};