import { sign } from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";
export const generateJwtAccessToken = (username: string) => {
    const jwtAccessToken = sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "1m" });
    return jwtAccessToken;
};

export const generateHashPassword = async (password: string) => {
    const salt = await genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};
