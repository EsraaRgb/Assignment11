import mongoose from "mongoose";
import commentSchema from "./Comment.model.js";
const NoteSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    picture: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const NoteModel = mongoose.model("Note", NoteSchema);
export default NoteModel;
