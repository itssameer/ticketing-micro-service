import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { singupRouter } from "./routes/signup";
import { singoutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from "@microservice_poc/common";

const app = express();

app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //only https requests allowed except test env
  })
);

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

export default app;
