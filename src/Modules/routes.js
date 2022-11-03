import { Router } from "express";
import { validate } from "../Middlewares/validation.middleware.js";
import { auth } from "../Middlewares/auth.middleware.js";
import * as schemas from "./auth/auth.validation.js";
import UserModel from "../../DB/Models/User.model.js";
const router = Router();

router.get("/signup", (req, res) => {
  const errMessage = req.flash("errMessage")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const validationErr = req.flash("validationErr");
  res.render("signup", { errMessage, validationErr, oldInputs });
});

router.get("/login", (req, res) => {
  const errMessage = req.flash("errMessage")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const validationErr = req.flash("validationErr");
  res.render("signin", { errMessage, validationErr, oldInputs });
});

router.get("/users",async (req, res) => {
  const users =await UserModel.find().select("-password -id").populate({
    path:'notes'
  })
  res.render("users", { users});
});
router.get("/profile", auth(), async (req, res) => {
  const errMessage = req.flash("errMessage")[0];
  const user = await UserModel.findById(req.session.user.id);
  res.render("profile", { user ,errMessage});
});
router.get("/update/:id", auth(), async (req, res) => {
  const errMessage = req.flash("errMessage")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const validationErr = req.flash("validationErr");
  const user = await UserModel.findById(req.session.user.id);
  res.render("updateUser", { user,errMessage,oldInputs,validationErr});
});
router.get("/notes", (req, res) => {
  
  res.render("notes", {  });
});
router.get("/updateNote", (req, res) => {
  res.render("updateNote", { errMessage: "" });
});
export default router;
