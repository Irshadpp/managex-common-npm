import { NextFunction, Request, Response } from "express"
import { JWTUserPayload, verifyJwt } from "../functions/jwt";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { ForbiddenError } from "../errors/for-bidden-error";
import {Model} from 'mongoose'
import { BadRequestError } from "../errors/bad-request-error";

declare module 'express-serve-static-core' {
    interface Request {
      user?: JWTUserPayload;
    }
  }

  export const requireAuth = (UserModel: Model<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken;
        const secret = process.env.JWT_ACCESS_SECRET as string;
        if(!secret){
            throw new Error("Can't access JWT_ACCESS_SECRET in requireAuth");
        }
        if(!token) throw new NotAuthorizedError();

        const user = verifyJwt(token, secret);
        if(!user) throw new ForbiddenError();
        req.user = user;
        try {
            const user = verifyJwt(token, secret);
            
            if (user === null) {
                return res.status(401).send({ message: "Token expired" });
            }
            
            if (!user) {
                return next(new ForbiddenError());
            }

            const checkUser = await UserModel.findById(user.id);
            if(!checkUser.isActive) throw new BadRequestError("Account has been blocked");
            
            req.user = user; 
            next();
        } catch (error) {
            return next(new ForbiddenError());
        }
    }
}
