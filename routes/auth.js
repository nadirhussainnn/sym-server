import express from "express";
import upload from "../middleware/upload-image.js";
import { register, login } from "../controller/auth.js";
import verifyToken from "../middleware/auth.js";

const route = express.Router();

route.post("/register", upload.single("picture"), register);
route.post("/login", login);

export default route;
