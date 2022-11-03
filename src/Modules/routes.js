import { Router } from "express";
import { validate } from "../Middlewares/validation.middleware.js";
import { auth } from "../Middlewares/auth.middleware.js";
import * as schemas from "./auth/auth.validation.js";
import UserModel from "../../DB/Models/User.model.js";
import NoteModel from "../../DB/Models/Note.model.js";
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

router.get("/users", async (req, res) => {
  const users = await UserModel.find().select("-password -id").populate({
    path: "notes",
  });
  res.render("users", { users });
});
router.get("/profile", auth(), async (req, res) => {
  const errMessage = req.flash("errMessage")[0];
  const user = await UserModel.findById(req.session.user.id);
  res.render("profile", { user, errMessage });
});
router.get("/update/:id", auth(), async (req, res) => {
  const errMessage = req.flash("errMessage")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const validationErr = req.flash("validationErr");
  const user = await UserModel.findById(req.session.user.id);
  res.render("updateUser", { user, errMessage, oldInputs, validationErr });
});
router.get("/notes", async (req, res) => {
  const notes = await NoteModel.find({ createdBy: req.session.user.id });
  const errMessage = req.flash("errMessage")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const validationErr = req.flash("validationErr");

  res.render("notes", { oldInputs, notes, errMessage, validationErr });
});
router.get("/updateNote/:id", async (req, res) => {
  const note = await NoteModel.findById(req.params.id);
  res.render("updateNote", { note });
});
router.get("/allnotes", async (req, res) => {
  const notes = await NoteModel.find();
  res.render("allNotes", { notes });
});
export default router;
