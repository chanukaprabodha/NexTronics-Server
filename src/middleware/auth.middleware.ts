import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

console.log("JWT_SECRET:", JWT_SECRET); // Should show your actual secret

export const authenticateToken = (req: Request,
                                  res: Response,
                                  next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            error: "Access token is missing"
        });
        return;
    }

    jwt.verify(token, JWT_SECRET,
        (error, user) => {
        if (error) {
            res.status(401).json({
                error: "Invalid or expired access token"
            });
            return;
        }
        (req as Request & { user?: any }).user = user; // Attach user to request object
        next();
    })
}

export const authorizeRoles = (... roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as Request & {user?: any}).user;
      if (!user || !roles.includes(user.role)){
          res.status(403).json({
              error: "Access denied! User doesn't have permission to perform this operation"
          });
          return
      }
      next();
  }
}