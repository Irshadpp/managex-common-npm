import { Request, Response } from "express"

export const setCookie = (res: Response, name: string, value: string, options: any): void =>{
    res.cookie(name, value, {
        httpOnly: true, 
        secure: true,
        sameSite: 'None',
        path: "/",
        domain: process.env.CLIENT_URL,
        ...options
    });
}
////
export const clearCookie = (res: Response, name: string): void =>{
    res.cookie(name, '', {maxAge: 0});
}

export const getCookie = (req: Request, name: string): string | undefined =>{
    return req.cookies[name];
};