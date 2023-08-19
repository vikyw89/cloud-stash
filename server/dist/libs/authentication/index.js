"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const TOKEN_DURATION = '30d';
const generateAccessToken = (user, duration = TOKEN_DURATION) => {
    const signedToken = jsonwebtoken_1.default.sign({
        user
    }, SECRET, { expiresIn: duration });
    return signedToken;
};
exports.generateAccessToken = generateAccessToken;
