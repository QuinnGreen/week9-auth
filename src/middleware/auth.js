const bcrypt = require("bcrypt");

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

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
};
