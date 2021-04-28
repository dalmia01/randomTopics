import * as express from "express";
import { verify } from "jsonwebtoken";

export const verifyJwtAccessToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authorizationHeader = req.headers["authorization"];
    const jwtAccessToken = authorizationHeader && authorizationHeader.split(" ")[1];
    if (!jwtAccessToken) return res.json({ error: "no access granted" }).sendStatus(400);

    verify(jwtAccessToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.json({ error: "not a valid request" }).sendStatus(401);

        next();
    });
};
