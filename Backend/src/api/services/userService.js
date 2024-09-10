const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = new User({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
  });

  await newUser.save();
};

const loginUser = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(loginData.password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

module.exports = { registerUser, loginUser };
