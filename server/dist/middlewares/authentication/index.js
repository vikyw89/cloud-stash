"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
    try {
        // we will compare jwt and cookies, if they aren't the same we will notify user of an account breach
        const cookie = req.cookies;
        const refreshToken = cookie.token;
        const headers = req.headers?.authorization;
        if (!headers || !refreshToken) {
            // suggest user to sign in
            throw new Error('please sign in');
        }
        const accessToken = headers && headers.split(" ")[1];
        if (accessToken !== refreshToken) {
            // user account is comprommised
            throw new Error('account is compromised, please change password');
        }
        const user = jsonwebtoken_1.default.verify(refreshToken, SECRET);
        res.locals.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authenticate = authenticate;
