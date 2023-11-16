import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import connection from "./database/connection.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import userPosts from "./routes/posts.js";

//  CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// connected with database
connection();

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", userPosts);

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT | 9000;

app.listen(PORT, () => console.log(`Listening PORT = ${PORT}`));
