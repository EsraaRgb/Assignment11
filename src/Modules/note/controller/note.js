import NoteModel from "../../../../DB/Models/Note.model.js";
import cloudinary from "../../../Services/Cloudinary.js";

export const addNote = async (req, res) => {
  if (!req.file) {
    req.flash("errMessage", "Image is required");
    res.redirect("/notes");
  } else {
    const { body } = req.body;
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "notes",
    });
    const note = await NoteModel.create({
      body,
      picture: secure_url,
      createdBy: req.session.user.id,
    });
    res.redirect("/notes");
  }
};
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  await NoteModel.findOneAndDelete({ _id: id, createdBy: req.session.user.id });
  res.redirect("/notes");
};
export const updateNote = async (req, res) => {
  console.log("update");
  const { id } = req.params;
  const user = await NoteModel.findOneAndUpdate(
    { _id: id },
    { body: req.body.body },
    { new: true }
  );
  console.log(user);
  res.redirect("/notes");
};

