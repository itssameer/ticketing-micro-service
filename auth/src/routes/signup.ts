import express, { Request, Response } from "express";

import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@microservice_poc/common";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Eamil must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters long"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });

    await user.save();

    //generate JWT
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    //Store it on session object

    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as singupRouter };
