const { Router } = require("express");
const userRouter = Router();

const { signupUser } = require("./controllers");

const { getAllUsers } = require("./controllers");

userRouter.post("/users/signup", signupUser);

userRouter.get("/users/getAllUsers", getAllUsers);

module.exports = userRouter;
