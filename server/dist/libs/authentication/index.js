"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const TOKEN_DURATION = '15m';
const generateRefreshToken = (user) => {
    const signedToken = jsonwebtoken_1.default.sign({
        user
    }, SECRET);
    return signedToken;
};
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = (user) => {
    const signedToken = jsonwebtoken_1.default.sign({
        user
    }, SECRET, { expiresIn: TOKEN_DURATION });
    return signedToken;
};
exports.generateAccessToken = generateAccessToken;
