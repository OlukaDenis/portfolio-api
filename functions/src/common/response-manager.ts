import { HttpException } from "../common"
import { NextFunction, Response } from "express";

export const sendError = (next: NextFunction, message: string, code: number) => {
    return next(new HttpException(code, message))
}

export const sendSuccess = (res: Response, data: any, code: number) => {
    return res.status(code).json({
        statusCode: code,
        success: true,
        data: data
    })
}