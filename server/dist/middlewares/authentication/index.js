"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRefreshToken = exports.authenticateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const authenticateAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || Array.isArray(authHeader))
        return res.send('no authentication');
    const token = authHeader.split(" ")[1];
    // check if token exist
    if (!token)
        return res.send('no authentication');
    // check if it's verified
    const verifiedToken = jsonwebtoken_1.default.verify(token, SECRET);
    req.user = verifiedToken;
    next();
};
exports.authenticateAccessToken = authenticateAccessToken;
const authenticateRefreshToken = (req, res, next) => {
    const cookie = req.cookies;
    const refreshToken = cookie.refreshToken;
    if (!refreshToken)
        return res.send("please sign in");
    const isAuthenticated = jsonwebtoken_1.default.verify(refreshToken, SECRET);
    if (!isAuthenticated)
        return res.send("session expired, please sign in");
    next();
};
exports.authenticateRefreshToken = authenticateRefreshToken;
