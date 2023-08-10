"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = void 0;
const __1 = require("../..");
const bcrypt_1 = require("bcrypt");
const authentication_1 = require("../../libs/authentication");
const COOKIE_DURATION = 2629746000;
const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await __1.prisma.user.findFirst({
            where: {
                email,
            },
            include: {
                job: true
            }
        });
        if (!result)
            return res.status(404).send('invalid username');
        if (!(0, bcrypt_1.compare)(password, result.password))
            return res.status(406).send('invalid password');
        const user = {
            email,
            id: result.id,
            job: result.job
        };
        const refreshToken = (0, authentication_1.generateRefreshToken)(user);
        res.cookie("refreshToken", refreshToken, { maxAge: COOKIE_DURATION, httpOnly: true, secure: true });
        const accessToken = (0, authentication_1.generateAccessToken)(user);
        return res.send(accessToken);
    }
    catch (err) {
        next(err);
    }
};
exports.signIn = signIn;
const signOut = async (req, res, next) => {
    try {
        // remove refresh token
        res.cookie("refreshToken", null);
        // delete access token   
        return res.status(200).send(null);
    }
    catch (err) {
        next(err);
    }
};
exports.signOut = signOut;
