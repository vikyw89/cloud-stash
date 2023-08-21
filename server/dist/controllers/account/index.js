"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerification = exports.emailSignUp = exports.signOut = exports.emailSignIn = exports.ACCESS_TOKEN_DURATION = exports.COOKIE_DURATION = void 0;
const bcrypt_1 = require("bcrypt");
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const __1 = require("../..");
const sendEmail_1 = require("../../helpers/emails/sendEmail");
exports.COOKIE_DURATION = 2629746000;
exports.ACCESS_TOKEN_DURATION = '1h';
const SALT_ROUND = process.env.SALT_ROUND || 10;
const SIGN_IN_URL = process.env.SIGN_IN_URL || 'http://localhost:3000/signIn';
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "http://localhost:3001/api";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("please set .env JWT_SECRET");
}
/**
 * Given email, and password, attach jwt access token to header and cookie
 * @date 8/21/2023 - 12:04:51 PM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const emailSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const uuid = (0, crypto_1.randomUUID)();
        const dbResult = await __1.prisma.user.update({
            where: {
                email
            },
            data: {
                refreshToken: uuid
            }
        });
        if (!dbResult) {
            throw new Error('invalid email');
        }
        if (!(0, bcrypt_1.compare)(password, dbResult.password)) {
            throw new Error('invalid password');
        }
        const tokenPayload = {
            email: dbResult.email,
            id: dbResult.id,
            name: dbResult.name,
            refreshToken: uuid
        };
        // generate refresh token
        const token = jsonwebtoken_1.default.sign(tokenPayload, JWT_SECRET);
        // if not activated yet, resend token through email
        if (dbResult.isVerified === false) {
            const verificationURL = `${SERVER_BASE_URL}/account/emailVerification/${token}`;
            (0, sendEmail_1.sendEmail)({
                userEmail: email, subject: 'please verify your email address', content: `
                <h1>thank you for registering to cloud-stash, click the link below to validate your account</h1>
                <a href="${verificationURL}">VERIFY</a>
            `
            });
            res.status(200).json({ message: 'please check your email' });
        }
        // attach refreshToken in cookies
        res.cookie("token", token, { maxAge: exports.COOKIE_DURATION, httpOnly: true, secure: true });
        // generate access token
        const accessToken = jsonwebtoken_1.default.sign(tokenPayload, JWT_SECRET, { expiresIn: exports.ACCESS_TOKEN_DURATION });
        res.status(200).header({ 'Authorization': `Bearer ${accessToken}` }).json({ message: 'signed in' });
    }
    catch (err) {
        next(err);
    }
};
exports.emailSignIn = emailSignIn;
/**
 * Clear cookies and header
 * @date 8/21/2023 - 12:09:12 PM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const signOut = async (req, res, next) => {
    try {
        // remove refresh token
        res.clearCookie('token');
        // remove access token   
        res.status(200).header({ 'Authorization': '' }).json({ message: 'signed out !' });
    }
    catch (err) {
        next(err);
    }
};
exports.signOut = signOut;
/**
 * Will register user into database, and send a verification link
 *
 * @date 8/19/2023 - 9:07:35 PM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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
        const dbResult = await __1.prisma.user.create({
            data: {
                name,
                password: await (0, bcrypt_1.hash)(password, +SALT_ROUND),
                email,
            }
        });
        // send email verification
        const tokenPayload = {
            email: dbResult.email,
            id: dbResult.id,
            name: dbResult.name
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, JWT_SECRET);
        const verificationURL = `${SERVER_BASE_URL}/account/emailVerification/${token}`;
        (0, sendEmail_1.sendEmail)({
            userEmail: email, subject: 'please verify your email address', content: `
            <h1>thank you for registering to cloud-stash, click the link below to validate your account</h1>
            <a href="${verificationURL}">VERIFY</a>
        `
        });
        res.status(200).json({ message: 'please check your email' });
    }
    catch (err) {
        next(err);
    }
};
exports.emailSignUp = emailSignUp;
const emailVerification = async (req, res, next) => {
    try {
        // get email verifications param
        const { token } = req.params;
        res.locals.token = token;
        // verify token
        const data = jsonwebtoken_1.default.verify(token, JWT_SECRET, { ignoreExpiration: true });
        if (typeof data === "string" || !data) {
            throw new Error("invalid token !");
        }
        // find user with the same param
        // modify user to verified
        await __1.prisma.user.update({
            where: {
                id: data.id,
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
