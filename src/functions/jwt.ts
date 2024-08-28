import Jwt from "jsonwebtoken"

export interface JWTUserPayload{
    userId: string;
    role: string;
    organization: string;
}

export const generateJwtAccessToken = (payload: JWTUserPayload, secret: string) =>{
    return Jwt.sign(
        payload,
        secret,
        {
            expiresIn:"1h"
        }
    )
}

export const generateJwtRefreshToken = (payload: JWTUserPayload, secret: string)=>{
    return Jwt.sign(
        payload,
        secret,
        {
            expiresIn: "15d"
        }
    )
}

export const verifyJwt = (token: string, secret: string): JWTUserPayload =>{
    return Jwt.verify(token, secret) as JWTUserPayload;
}