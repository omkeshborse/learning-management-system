import express, { json } from "express";

import cors from "cors";
import cookieParse from "cookie-parser";
import {config } from 'dotenv'
import morgan from 'morgan' ;
import userRoutes from './routes/user.routes.js'
import errorMiddleware from "./middleware/error.middleware.js";
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
/* logger middleware  */
/* use for generating logs after any request from the browser or postman */
app.use(morgan('dev')) ;
app.use(cookieParse());

app.use("/ping", function (req, res) {
  res.send("pong");
});

// routes of 3 modules
app.use('/api/v1/user' , userRoutes)


app.use("*", (req, res) => {
  res.status(404).send("oops ! 404 page not found ");
});

app.use(errorMiddleware)
export default app;
