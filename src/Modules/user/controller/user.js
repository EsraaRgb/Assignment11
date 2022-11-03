import UserModel from "../../../../DB/Models/User.model.js";
import cloudinary from "../../../Services/Cloudinary.js";

export const addPic = async (req, res) => {
  if (!req.file) {
    req.flash("errMessage", "image required");
    res.redirect("/profile");
  } else {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "user/profilePic",
    });
    const user = await UserModel.findByIdAndUpdate(
      req.session.user.id,
      { profilePic: secure_url },
      { new: true }
    );
    res.redirect("/profile");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if(id==req.session.user.id){
    const user = await UserModel.findByIdAndDelete({_id:id});
    res.redirect("/signup");
  }
  else{
    res.redirect('/login')
  }

};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate({_id:id},req.body,{new:true})
  res.redirect("/profile");
};