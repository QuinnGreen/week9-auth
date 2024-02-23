const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/auth");

const {
  signupUser,
  login,
  getAllUsers,
  updateEmail,
  deleteUser,
} = require("./controllers");

userRouter.post("/users/signup", hashPass, signupUser);

userRouter.get("/users/getAllUsers", tokenCheck, getAllUsers);

userRouter.post("/users/login", comparePass, login);

userRouter.get("/users/authCheck", tokenCheck, login);

userRouter.put("/users/updateEmail", updateEmail);

userRouter.delete("/users/deleteUser", deleteUser);

module.exports = userRouter;
