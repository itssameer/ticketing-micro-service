import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { singupRouter } from "./routes/signup";
import { singoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(singoutRouter);
app.use(singupRouter);

// app.all("*", async (req: Request, res: Response, next: NextFunction) => {
//   next(new NotFoundError());
// });

//alternatively using express-async-errors
app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to MongoDB");
  } catch (e) {
    console.error(e);
    console.log("catch");
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});

start();
