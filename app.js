import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "./config/.env") });
import express from "express";
import connectDB from "./DB/connection.js";
import * as Router from "./src/Modules/index.router.js";
import session from "express-session";
import MongoDBStore from'connect-mongodb-session'
import flash from 'connect-flash'
const MongoSession = MongoDBStore(session)
const app = express();
const store = new MongoSession({
  uri: process.env.DB_URI,
  collection: 'mySessions'
});
app.use(session({
  secret: process.env.SessionKey,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(flash())

app.use(express.json());

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/views'))

app.use(`/`, Router.pagesRouter);
app.use(`/auth`, Router.authRouter);
app.use(`/user`, Router.userRouter);
app.use(`/note`, Router.noteRouter);
app.use("*", (req,res) => res.send("In-valid Routing"));

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});
