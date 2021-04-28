import { sign, verify } from "jsonwebtoken";
import { genSalt, hash, compare } from "bcrypt";
export const generateJwtAccessToken = (username: string) => {
    const jwtAccessToken = sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "1m" });
    return jwtAccessToken;
};

export const generateHashPassword = async (password: string) => {
    const salt = await genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};

export const verifyHashedPassword = async (argsPassword: string, userPassword: string) => {
    const isVerifiedHasedPassword = await compare(argsPassword, userPassword);
    return isVerifiedHasedPassword;
};
