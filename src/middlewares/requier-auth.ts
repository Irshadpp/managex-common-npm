import { NextFunction, Request, Response } from "express"
import { JWTUserPayload, verifyJwt } from "../functions/jwt";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { ForbiddenError } from "../errors/for-bidden-error";

declare module 'express-serve-static-core' {
    interface Request {
      user?: JWTUserPayload;
    }
  }

export const requireAuth = (req: Request, res: Response, next: NextFunction) =>{
        const token = req.cookies.accessToken;
        const secret = process.env.JWT_ACCESS_SECRET as string;
        if(!secret){
            throw new Error("Can't access JWT_ACCESS_SECRET in requireAuth");
        }
        if(!token) throw new NotAuthorizedError();

        const user = verifyJwt(token, secret);
        if(!user) throw new ForbiddenError();
        req.user = user;
        next();
        // if(authHead){
        //     const token = authHead.split(' ')[1];

        //     try {
        //         const user = verifyJwt(token, secret) as JWTUserPayload;
        //         req.user = user;
        //         next();
        //     } catch (error) {
        //         throw new NotAuthorizedError();
        //     }
        // }else{
        //     throw new Error("Token not found");
        // }
    }
