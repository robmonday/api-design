import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // puts query strings into an object
app.use(cors());

// app.get("/", (req, res, next) => {
//   setTimeout(() => {
//     next(new Error("here is an async error"));
//   }, 2000);
// });

app.get("/", (req, res) => {
  res.status(200);
  console.log("hello from express");
  res.json({ message: "hello" });
});

app.use("/api", protect, router); // added protect middleware function to validate tokens

app.post("/user", createNewUser);
app.post("/signin", signin);

// this is only for sync errors
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, thats on us" });
  }
});

export default app;
