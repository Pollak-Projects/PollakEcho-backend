import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IStudentRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: IStudentRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
    return;
  }
};
