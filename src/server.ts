import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // puts query strings into an object
app.use(cors());

app.get("/hello", (req, res) => {
  res.status(200);
  console.log("hello from express");
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
