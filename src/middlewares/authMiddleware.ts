import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../errors/HttpError";

export class AuthMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HttpError("Token não fornecido", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded as { userId: number; name: string };

      next();
    } catch (error) {
      throw new HttpError("Token inválido", 401);
    }
  }
}
