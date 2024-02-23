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
    if (!req.authCheck) {
      res.status(401).json({ message: "Not logged in" });
      return;
    }
    const user = await User.findAll({});

    //   console.log(user);
    res.send({ message: "here are all the Users", user: user });
  } catch {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    if (req.authCheck) {
      const user = {
        id: req.authCheck.id,
        username: req.authCheck.username,
      };

      res
        .status(201)
        .json({ message: "persistant login successful", user: user });
      return;
    }

    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET);

    console.log(token);

    const user = {
      id: req.user.id,
      username: req.user.username,
      token: token,
    };

    const userData = req.user;

    res.json({ success: true, user: userData, user: user });

    // res.send("Logged in Correctly");
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const updateEmail = async (req, res) => {
  try {
    const username = req.body.username;
    const updatedEmail = req.body.email;

    // Find the user
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).send({ message: "Error: User not found" });
    }

    // Update the email
    await user.update({ email: updatedEmail });

    res.send({ message: "Success: Email updated", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error: Unable to update email" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const username = req.body.username;

    // Find the user
    const userToDelete = await User.findOne({ where: { username: username } });

    if (!userToDelete) {
      return res.status(404).send({ message: "Error: user not found" });
    }

    // Delete the user
    await userToDelete.destroy();

    res.send({ message: "Success: user deleted", user: userToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error: Unable to delete user" });
  }
};
module.exports = {
  signupUser: signupUser,
  getAllUsers: getAllUsers,
  login: login,
  updateEmail: updateEmail,
  deleteUser: deleteUser,
};
