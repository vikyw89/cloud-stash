"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const PORT = process.env.PORT || 3001;
const MAX_LIMITER = process.env.API_RATE_LIMIT || 60;
const app = (0, express_1.default)();
const prismaRaw = new client_1.PrismaClient();
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const controllers_1 = require("./controllers");
const error_1 = require("./middlewares/error");
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: +MAX_LIMITER,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
});
exports.prisma = prismaRaw.$extends({
// name: 'activity',
// query: {
//     async $allOperations({ operation, model, args, query }) {
//         const start = performance.now()
//         const [result] = await prismaRaw.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
//         const end = performance.now()
//         const time = end - start
//         console.log({ start, result, end, time })
//         console.log({ operation, model, args, query })
//         return result
//     },
// },
});
// middlewares
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(limiter);
// controller
app.use('/api', controllers_1.router);
app.get('*', (req, res) => {
    return res.status(200).send(`Welcome to cloud-stash server, running in [${process.env.NODE_ENV}] mode`);
});
app.use(error_1.errorHandler);
app.listen(PORT, () => console.log(`REST API server ready at: ${PORT}`));
