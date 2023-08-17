"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    res.status(500).json(err);
    next();
}
exports.errorHandler = errorHandler;
