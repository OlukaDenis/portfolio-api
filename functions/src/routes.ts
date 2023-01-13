import { Request, Response, NextFunction, Router } from "express";
import { sendSuccess, sendError, asyncHandler } from "./common";

const appRouter = Router();


const getMe = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    console.log("Get me")
    const payload = {
        data: "Denis here shshhsh"
    }

    if (!payload) return sendError(next, "Not found", 400);

    return sendSuccess(res, payload, 200);
});

appRouter.route("/denis").get(getMe)

export default appRouter;