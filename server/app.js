import express, { json } from "express";

import cors from "cors";
import cookieParse from "cookie-parser";
import {config } from 'dotenv'
import morgan from 'morgan'
config() ;
const app = express();

/* parse to json */
app.use(json());

/* Cors */
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(morgan('dev')) ;
app.use(cookieParse());

app.use("/ping", function (req, res) {
  res.send("pong");
});

// routes of 3 modules

app.use("*", (req, res) => {
  res.status(404).send("oops ! 404 page not found ");
});

export default app;
