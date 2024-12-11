import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥🔥🔥🔥", error);
  return void res.status(500).json({ message: "Internal server error" });
};
