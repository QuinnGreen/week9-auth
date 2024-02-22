const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/auth");

const { signupUser, login, getAllUsers } = require("./controllers");

userRouter.post("/users/signup", hashPass, signupUser);

userRouter.get("/users/getAllUsers", tokenCheck, getAllUsers);

userRouter.post("/users/login", comparePass, login);

userRouter.get("/users/authCheck", tokenCheck, login);

module.exports = userRouter;
