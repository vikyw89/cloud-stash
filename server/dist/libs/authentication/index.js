"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewAccessToken = exports.validateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_DURATION = '30d';
const ACCESS_TOKEN_DURATION = '1d';
const generateAccessToken = ({ payload, duration = ACCESS_TOKEN_DURATION }) => {
    const signedToken = jsonwebtoken_1.default.sign({
        payload
    }, SECRET, { expiresIn: duration });
    return signedToken;
};
exports.generateAccessToken = generateAccessToken;
/**
 * Validate a token, return renewed token if valid, return false if invalid
 * @date 8/19/2023 - 8:30:00 PM
 *
 * @param {ValidateTokenProps} {token, secretKey?}
 */
const validateToken = ({ token, secretKey }) => {
    let verifyResult;
    try {
        verifyResult = jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (err) {
        verifyResult = false;
    }
};
exports.validateToken = validateToken;
const renewAccessToken = ({ duration = ACCESS_TOKEN_DURATION, oldToken }) => {
    const oldTokenPayload = jsonwebtoken_1.default.decode(token, options);
};
exports.renewAccessToken = renewAccessToken;
