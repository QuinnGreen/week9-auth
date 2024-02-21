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

const login = async (req, res) => {
  try {
    // What do I want to achieve?
    // User able to login.
    // What do I need to happen for the user to be able to login?
    // User enters username and password.
    // Send username and password
    // Compare password with hashed on DB (see comparePass in auth.js)
    // Send back user data to user
    // What kind of data am I sending back?
    // user id, username, NOT PASSWORD, NOT EMAIL
    // Where does the data come from/how do we get it?
    // From DB in Users table
    // Do we already have the user data? If so, where?
    // Yes. We get it in comparePass to compare user passwords
    // Could we reuse this user data and send this back?
    // yes.
    // How do we send it back?
    // In a response in the login function
    // Do we have access to the user data in the login function?
    // No. The user data exists in comparePass.
    // Can we get it from comparePass to login? If so, how?
    // Yes. We can send the user object from comparePass to login.
    // That's cool Z. How?
    // Compare pass gets the request object and passes it to login
    // We can attach the user to the request (req) in comparePass,
    // which will then be available in login.

    const userData = req.user;

    res.json({ success: true, user: userData });

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
