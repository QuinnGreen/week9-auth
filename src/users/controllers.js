const User = require("./model");

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
module.exports = {
  signupUser: signupUser,
  getAllUsers: getAllUsers,
};
