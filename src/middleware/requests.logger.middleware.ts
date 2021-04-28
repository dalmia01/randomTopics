import * as express from "express";
export const requestLoggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.info(`starting -- ${req.method} ${req.originalUrl}`);
    const startTime = new Date().getTime();
    res.on("finish", () => {
        const elapsedTime = new Date().getTime() - startTime;
        console.info(`ending -- ${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedTime}ms`);
    });
    next();
};
