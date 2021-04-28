import * as express from "express";

import { generateJwtAccessToken, generateHashPassword, verifyHashedPassword } from "../helpers/helper.functions";
import { articles } from "../data/articles";
import UserModel from "../models/users";

export const signUpUser = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await generateHashPassword(password);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
        });

        const user = await newUser.save();

        res.json({ msg: "user registered successfully done" });
    } catch (err) {
        console.log(`the error is :: ${err}`);
        res.json({ error: "some error occured while saving or hashing data" }).sendStatus(403);
    }
};

export const signInUser = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    try {
        const jwtAccessToken = generateJwtAccessToken(username);

        const user = await UserModel.findOne({ username: username });

        if (!user) res.json({ msg: "user does not exist" });

        const isVerifiedHashPassword = await verifyHashedPassword(password, user["password"]);

        if (!isVerifiedHashPassword) res.json({ msg: "wrong credentials" });

        res.json({ message: "successfully logged in", jwtAccessToken });
    } catch (err) {}
};

export const getAllArticles = (req: express.Request, res: express.Response) => {
    const { author } = req.body;
    const filteredArticles = articles.filter((article) => article.author === author);
    res.json({ articles: filteredArticles });
};
