import { NextFunction, Request, Response } from "express"
import { JWTUserPayload, verifyJwt } from "../functions/jwt";
import { NotAuthorizedError } from "../errors/not-authorized-error";

declare module 'express-serve-static-core' {
    interface Request {
      user?: JWTUserPayload;
    }
  }

export const requireAuth = (req: Request, res: Response, next: NextFunction) =>{
        const authHead = req.headers.authorization;
        const secret = process.env.JWT_ACCESS_SECRET as string;
        if(!secret){
            throw new Error("Can't access JWT_ACCESS_SECRET in requireAuth");
        }
        
        if(authHead){
            const token = authHead.split(' ')[1];

            try {
                const user = verifyJwt(token, secret) as JWTUserPayload;
                req.user = user;
                next();
            } catch (error) {
                throw new NotAuthorizedError();
            }
        }else{
            throw new Error("Token not found");
        }
    }