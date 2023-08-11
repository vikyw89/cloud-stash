"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    console.log("🚀 ~ file: index.ts:4 ~ errorHandler ~ err:", err);
    res.status(500).send(err.message);
    next();
}
exports.errorHandler = errorHandler;
