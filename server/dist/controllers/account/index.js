"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.emailSignUp = exports.signOut = exports.emailSignIn = void 0;
const __1 = require("../..");
const bcrypt_1 = require("bcrypt");
const authentication_1 = require("../../libs/authentication");
const zod_1 = __importDefault(require("zod"));
const COOKIE_DURATION = 2629746000;
const SALT_ROUND = process.env.SALT_ROUND || 10;
const emailSignIn = async (req, res, next) => {
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
        if (!result) {
            throw new Error('invalid password');
        }
        if (!(0, bcrypt_1.compare)(password, result.password)) {
            throw new Error('invalid password');
        }
        const user = {
            email: result.email,
            id: result.id,
        };
        const accessToken = (0, authentication_1.generateAccessToken)(user);
        res.cookie("token", accessToken, { maxAge: COOKIE_DURATION, httpOnly: true, secure: true });
        return res.json({ Authorization: `Bearer ${accessToken}` });
    }
    catch (err) {
        next(err);
    }
};
exports.emailSignIn = emailSignIn;
const signOut = async (req, res, next) => {
    try {
        // remove refresh token
        res.clearCookie('refreshToken');
        // delete access token   
        return res.status(200).send(null);
    }
    catch (err) {
        next(err);
    }
};
exports.signOut = signOut;
const emailSignUp = async (req, res, next) => {
    try {
        const { name, password, email } = req.body;
        const passwordPattern = new RegExp(String.raw `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`);
        const schema = zod_1.default.object({
            name: zod_1.default.string().max(100),
            password: zod_1.default.string().max(100).regex(passwordPattern),
            email: zod_1.default.string().email()
        });
        schema.parse({
            name,
            password,
            email
        });
        const result = await __1.prisma.user.create({
            data: {
                name,
                password: await (0, bcrypt_1.hash)(password, +SALT_ROUND),
                email
            }
        });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.emailSignUp = emailSignUp;
const auth = async (req, res, next) => {
    try {
        const result = req.user;
        console.log("🚀 ~ file: index.ts:99 ~ auth ~ result:", result);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.auth = auth;
