const userService = require("../services/userService");

const createUser = async (req, res, next) => {
  try {
    const result = await userService.registerUser(req.body);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { token } = await userService.loginUser(req.body);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, loginUser };
