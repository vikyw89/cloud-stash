"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerification = exports.emailSignUp = exports.signOut = exports.emailSignIn = void 0;
const __1 = require("../..");
const bcrypt_1 = require("bcrypt");
const authentication_1 = require("../../libs/authentication");
const zod_1 = __importDefault(require("zod"));
const emailVerification_1 = require("../../libs/emails/emailVerification");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const COOKIE_DURATION = 2629746000;
const SALT_ROUND = process.env.SALT_ROUND || 10;
const SIGN_IN_URL = process.env.SIGN_IN_URL || 'http://localhost:3000/signIn';
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "http://localhost:3001/api";
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
        // if not activated yet, resend token through email
        if (result.isVerified === false) {
            const token = (0, authentication_1.generateAccessToken)({ email: email, id: result.id });
            await (0, emailVerification_1.sendVerificationEmail)({ recipientAddress: email, url: `${SERVER_BASE_URL}/account/emailVerification/${token}` });
            res.status(200).json({ message: 'check your email' });
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
            name: zod_1.default.string().max(100).min(1),
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
        // send email verification
        // TODO
        // GENERATE TOKEN
        const token = (0, authentication_1.generateAccessToken)({ email: email, id: result.id });
        await (0, emailVerification_1.sendVerificationEmail)({ recipientAddress: email, url: `${SERVER_BASE_URL}/account/emailVerification/${token}` });
        res.status(200).json({ message: 'check your email' });
    }
    catch (err) {
        next(err);
    }
};
exports.emailSignUp = emailSignUp;
const emailVerification = async (req, res, next) => {
    try {
        // get email verifications param,
        const { token } = req.params;
        res.locals.token = token;
        // verify token
        const data = jsonwebtoken_1.default.decode(token);
        if (typeof data === "string" || !data) {
            throw new Error("invalid token");
        }
        const user = data.user;
        // find user with the same param,
        // modify user to verified
        await __1.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isVerified: true
            }
        });
        // redirect to website sign in
        res.status(200).redirect(SIGN_IN_URL);
    }
    catch (err) {
        next(err);
    }
};
exports.emailVerification = emailVerification;
