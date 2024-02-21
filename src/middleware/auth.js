const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, re, next) => {
  try {
    console.log("req.body.password: ", req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    const password = req.body.password;
    const username = req.body.username;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user.dataValues; //to send the data back to client
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const tokenCheck = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    // check request headers

    if (!req.header("Authorization")) {
      throw new Error("no Token passed");
    }
    // get jwt from headers

    const token = req.header("Authorization").replace("Bearer ", "");
    // docode token using secret
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    // get user with ID
    const user = await User.findOne({ where: { id: decodedToken.id } });
    // if !user send 401

    if (!user) {
      res.status(401).json({ message: "not authorized" });
      return;
    }
    // pass on user data to login

    req.authCheck = user;
    next();
    // res.send({ decodedToken: decodedToken, user: user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  tokenCheck: tokenCheck,
};
