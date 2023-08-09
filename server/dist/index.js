"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const MAX_LIMITER = process.env.API_RATE_LIMIT || 60;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prismaRaw = new client_1.PrismaClient();
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const controllers_1 = require("./controllers");
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: +MAX_LIMITER,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
});
exports.prisma = prismaRaw.$extends({
    name: 'activity',
    query: {
        async $allOperations({ operation, model, args, query }) {
            const start = performance.now();
            const [result] = await prismaRaw.$transaction([query(args)]); // wrap the query in a batch transaction, and destructure the result to return an array
            const end = performance.now();
            const time = end - start;
            console.log({ start, result, end, time });
            console.log({ operation, model, args, query });
            return result;
        },
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(limiter);
app.use('/api', controllers_1.router);
app.get('*', (req, res) => {
    return res.status(200).send(`Welcome to cloud-stash server, running in [${process.env.NODE_ENV}] mode`);
});
app.use((err, req, res, next) => {
    return res.status(err?.errorCode ?? 500).send(err.message);
});
app.listen(PORT, () => console.log(`REST API server ready at: http://localhost:${PORT}`));
