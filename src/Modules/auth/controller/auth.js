import UserModel from "../../../../DB/Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { email, password, userName, phone } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    req.flash("oldInputs", req.body);
    req.flash("errMessage", "Email Exist");
    res.redirect("/signup");
  } else {
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      userName,
      phone,
    });
    res.redirect("/login");
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });
  if (user) {
    const checkPassResult = await bcrypt.compare(password, user.password);
    if (checkPassResult) {
      if (!user.isDeleted) {
        req.session.user = {
          id: user._id,
          isLoggedIn: true,
        };
        req.flash("user", user);
        res.redirect("/profile");
      } else {
        req.flash("errMessage", "Your Account Is Deleted");
        res.redirect("/signup");
      }
    } else {
      req.flash("oldInputs", req.body);
      req.flash("errMessage", "wrong password");
      res.redirect("/login");
    }
  } else {
    req.flash("oldInputs");
    req.flash("validationErr");
    req.flash("errMessage", "Signup First");
    res.redirect("/signup");
  }
};
