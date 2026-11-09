import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // Duplicate unique field (e.g. duplicate recipe slug)
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    res.status(409).json({
      status: "error",
      message: "A recipe with this slug already exists",
    });
    return;
  }

  // Record not found
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    res.status(404).json({
      status: "error",
      message: "Recipe not found",
    });
    return;
  }

  // Unexpected errors
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
