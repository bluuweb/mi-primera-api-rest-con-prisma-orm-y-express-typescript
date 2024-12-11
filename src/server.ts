import express from "express";

import { errorMiddleware } from "./middlewares/error.middleware";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
