import { Router } from "express";
import { prisma } from "../config/prisma";

const postRouter = Router();

// /api/v1/posts

postRouter.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const { title, content, authorEmail } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default postRouter;
