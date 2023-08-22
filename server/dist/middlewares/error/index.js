"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
async function errorHandler(err, req, res, next) {
    switch (true) {
        case err instanceof client_1.Prisma.PrismaClientKnownRequestError: {
            res.status(400).json({ ...err, ref: 'https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes', message: 'invalid input !' });
            break;
        }
        case err instanceof zod_1.z.ZodError: {
            res.status(400).json({ ...err, ref: 'https://zod.dev/ERROR_HANDLING', message: 'invalid input type !' });
            break;
        }
        case err instanceof jsonwebtoken_1.default.TokenExpiredError: {
            res.status(400).json({ ...err, message: 'token is expired' });
            break;
        }
        case err instanceof jsonwebtoken_1.default.JsonWebTokenError: {
            res.status(400).json({ ...err, message: 'invalid token' });
            break;
        }
        default: {
            res.status(500).json({ ...err, message: 'something went wrong !' });
        }
    }
    next();
}
exports.errorHandler = errorHandler;
