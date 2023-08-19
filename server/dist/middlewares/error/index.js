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
            res.status(400).json({ message: 'invalid input !', detail: { ...err, ref: 'https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes' } });
            break;
        }
        case err instanceof zod_1.z.ZodError: {
            res.status(400).json({ message: 'invalid input type !', detail: { ...err, ref: 'https://zod.dev/ERROR_HANDLING' } });
            break;
        }
        case err instanceof jsonwebtoken_1.default.TokenExpiredError: {
            res.status(400).json({ message: 'token is expired', detail: { ...err } });
            break;
        }
        case err instanceof jsonwebtoken_1.default.JsonWebTokenError: {
            res.status(400).json({ message: 'invalid token', detail: { ...err } });
            break;
        }
        default: {
            res.status(500).json({ message: 'something broke !', detail: err });
        }
    }
    next();
}
exports.errorHandler = errorHandler;
