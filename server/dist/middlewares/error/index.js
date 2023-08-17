"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
function errorHandler(err, req, res, next) {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        res.status(400).json({ message: 'invalid request !', detail: { ...err, ref: 'https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes' } });
    }
    else if (err instanceof zod_1.z.ZodError) {
        res.status(400).json({ message: 'invalid input type !', detail: { ...err, ref: 'https://zod.dev/ERROR_HANDLING' } });
    }
    else {
        // if error is known, send code and status else, send 500 and something broke !
        res.status(500).json({ message: 'something broke !', detail: err });
        // TODO
        // send error log to file
        // https://github.com/vikyw89/cloud-stash/issues/new/choose
    }
    next();
}
exports.errorHandler = errorHandler;
