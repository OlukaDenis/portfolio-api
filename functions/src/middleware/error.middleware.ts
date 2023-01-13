import { HttpException } from "../common";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const status = error.statusCode || 500;

    res.status(status).json({
        status: status,
        success: false,
        message: error.message
    })
};