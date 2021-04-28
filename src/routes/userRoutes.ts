import * as express from "express";

import { generateJwtAccessToken, generateHashPassword } from "../helpers/helper.functions";
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

export const signInUser = (req: express.Request, res: express.Response) => {
    const { username } = req.body;
    const jwtAccessToken = generateJwtAccessToken(username);
    res.json({ message: "successfully logged in", jwtAccessToken });
};

export const getAllArticles = (req: express.Request, res: express.Response) => {
    const { author } = req.body;
    const filteredArticles = articles.filter((article) => article.author === author);
    res.json({ articles: filteredArticles });
};
