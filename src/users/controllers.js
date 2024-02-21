const User = require("./model");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ message: `${user.username} was added`, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll({});

    //   console.log(user);
    res.send({ message: "here are all the Users", user: user });
  } catch {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET);

    console.log(token);

    const user = {
      id: req.user.id,
      usernam: req.user.username,
      token: token,
    };

    const userData = req.user;

    res.json({ success: true, user: userData, user: user });

    // res.send("Logged in Correctly");
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};
module.exports = {
  signupUser: signupUser,
  getAllUsers: getAllUsers,
  login: login,
};
