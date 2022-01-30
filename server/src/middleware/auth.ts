import { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).send({ error: "You must be logged in!" });
    return;
  }

  next();
}
