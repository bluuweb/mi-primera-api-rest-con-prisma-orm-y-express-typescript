import { Router } from "express";
import { prisma } from "../config/prisma";
import { userCreateSchema } from "../schemas/user.schema";

const userRouter = Router();

// /api/v1/users

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = userCreateSchema.validate(req.body);

    if (error) {
      console.log("💔💔💔");
      throw new Error(error.message);
    }

    const { name, email } = value;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
