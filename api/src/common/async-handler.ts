/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Response, Request } from 'express'

export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}