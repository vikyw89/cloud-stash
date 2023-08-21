"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAccessToken = exports.authenticateRefreshToken = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("../..");
const account_1 = require("../../controllers/account");
const JWT_SECRET = process.env.JWT_SECRET;
const SIGN_IN_URL = process.env.SIGN_IN_URL;
const COOKIE_DURATION = 2629746000;
if (!JWT_SECRET || !SIGN_IN_URL) {
    throw new Error('no JWT_SECRET or SIGN_IN_URL');
}
/**
 * Verify refreshToken
 * @date 8/21/2023 - 12:10:42 PM
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const authenticateRefreshToken = (req, res, next) => {
    try {
        // we will check for cookies
        const cookie = req.cookies;
        const refreshToken = cookie?.token;
        // if there's no refresh token, redirect to sign in page
        if (!refreshToken) {
            res.status(400).redirect(SIGN_IN_URL);
        }
        // verify token
        const tokenPayload = jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET);
        // attach payload info to res
        res.locals.refreshTokenPayload = tokenPayload;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authenticateRefreshToken = authenticateRefreshToken;
/**
 * autthenticate access token, compare the refresh
 * @date 8/21/2023 - 12:34:13 PM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const authenticateAccessToken = async (req, res, next) => {
    const refreshTokenPayload = res.locals.refreshTokenPayload;
    // check for jwt
    const authHeader = req.headers.authorization ?? "";
    // extract accessToken
    const accessToken = authHeader.split(" ")?.[1];
    try {
        // if error (no JWT or expired or tampered), try to renew refresh Token
        jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        res.header({ 'Authorization': `Bearer ${accessToken}` });
    }
    catch (err) {
        // invalid accessToken, so we generate a new access Token and renew cookies
        // generate random UUID
        const newRefreshTokenPayload = {
            ...refreshTokenPayload,
            refreshToken: (0, crypto_1.randomUUID)()
        };
        // compare and update refreshToken
        // if invalid, error will be thrown
        try {
            await __1.prisma.user.update({
                where: {
                    id: refreshTokenPayload.id,
                    refreshToken: refreshTokenPayload.refreshToken
                },
                data: {
                    refreshToken: newRefreshTokenPayload.refreshToken
                }
            });
        }
        catch (err) {
            // if refreshToken secret is invalid, we signOut user
            res.clearCookie('token');
            next(err);
        }
        // renew cookies refresh token
        const newRefreshToken = jsonwebtoken_1.default.sign(newRefreshTokenPayload, JWT_SECRET);
        // attach cookies
        res.cookie("token", newRefreshToken, { secure: true, httpOnly: true, maxAge: COOKIE_DURATION });
        // generate a new accessToken
        const newAccessToken = jsonwebtoken_1.default.sign(refreshTokenPayload, JWT_SECRET, { expiresIn: account_1.ACCESS_TOKEN_DURATION });
        // attach access token
        res.header({ 'Authorization': `Bearer ${newAccessToken}` });
    }
    finally {
        next();
    }
};
exports.authenticateAccessToken = authenticateAccessToken;
