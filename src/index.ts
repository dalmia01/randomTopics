require("dotenv").config();
import * as express from "express";
import * as mongoose from "mongoose";

import { verifyJwtAccessToken } from "./middleware/auth.middleware";
import { requestLoggerMiddleware } from "./middleware/requests.logger.middleware";
import { signUpUser, signInUser, getAllArticles } from "./routes/userRoutes";
import { mongodbConfig } from "./config/mongodbConfig";

const app = express();

const { PORT } = process.env;

app.use(express.json());

app.use(requestLoggerMiddleware);

app.post("/signUpUser", signUpUser);
app.post("/signInUser", signInUser);
app.post("/articles", verifyJwtAccessToken, getAllArticles);

app.listen(PORT, async () => {
    console.log(`typescript file is up and running @ server :: ${PORT}`);
    try {
        await mongoose.connect(mongodbConfig().mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true });
        console.info("connected to mongo database ....");
    } catch (err) {
        console.error(err);
    }
});
