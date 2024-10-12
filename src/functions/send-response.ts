import { Response } from "express";

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    VERIFIED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }

  export const CommonMessages = {
    SUCCESS: "Operation successful",
    CREATED: "Resource successfully created",
    VERIFIED: "Resource verified",
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access forbidden",
    NOT_FOUND: "Resource not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
  };
  
  export const sendResponse = <T>(
    res: Response, 
    statusCode: HttpStatusCode, 
    message: string, 
    data?: T
  ): void => {
    res.status(statusCode).json({
      success: statusCode >= 200 && statusCode < 300,
      message,
      data,
    });
  };
  