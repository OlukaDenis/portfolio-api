/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const message = 'Resource not found';

    res.status(404).json({
        status: 404,
        success: false,
        message: message
    });
};