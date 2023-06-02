import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Token from "../model/token.js";
import User from "../model/user.js";

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {
            username: request.body.username,
            name: request.body.name,
            password: hashedPassword,
        };
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({ msg: "Signup successfull" });
    } catch (error) {
        return response
            .status(500)
            .json({ msg: "Error while signing up user" });
    }
};

export const loginUser = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username });
        console.log("Enthannu ith", user);
        if (!user) {
            return response
                .status(400)
                .json({ msg: "Username does not exist" });
        }

        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            console.log("------", process.env.ACCESS_SECRET_KEY);
            const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: "15m" }
            );
            const refreshToken = jwt.sign(
                user.toJSON(),
                process.env.REFRESH_SECRET_KEY
            );

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                username: user.username,
            });
        } else {
            return response.status(400).json({ msg: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        return response
            .status(500)
            .json({ msg: "An error occurred during login" });
    }
};

export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: "logout successfull" });
};
