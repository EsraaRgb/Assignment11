import userModel from "../../DB/Models/User.model.js";

export const auth = () => {
  return async (req, res, next) => {
    if (
      !req.session ||
      !req.session?.user?.id ||
      !req.session?.user?.isLoggedIn
    ) {
      req.flash('errMessage',"In-valid session information")
      res.redirect("login");
    } else {
      const user = await userModel.findById(req.session.user.id);
      if (!user) {
        req.flash('errMessage',"Account not register")
        res.redirect("signup");
      } else {
        next();
      }
    }
  };
};
