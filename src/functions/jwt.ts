import Jwt from "jsonwebtoken"

export interface JWTUserPayload{
    id: string;
    name: string;
    profileURL: string | null;
    role: string;
    isActive: boolean;
    organization: string;
}

export const generateJwtAccessToken = (payload: JWTUserPayload, secret: string) =>{
    return Jwt.sign(
        payload,
        secret,
        {
            expiresIn:"5m"
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

export const verifyJwt = (token: string, secret: string): JWTUserPayload | null =>{
    try {
        return Jwt.verify(token, secret) as JWTUserPayload;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return null;
        }
        throw error;
    }
}