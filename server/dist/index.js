"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
// const prisma = prismaRaw.$extends({
//     name: 'log',
//     query: {
//         async $allOperations({ operation, model, args, query }) {
//             const start = performance.now()
//             const [result] = await prismaRaw.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
//             const end = performance.now()
//             const time = end - start
//             console.log({ start, result, end, time })
//             console.log({ operation, model, args, query })
//             return result
//         },
//     },
// });
// ... your REST API routes will go here
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
app.post('/users', async (req, res) => {
    const users = await prisma.user.create({
        data: {
            email: 'vikyw89@gmail.com',
            name: 'viky'
        }
    });
    res.json(users);
});
app.listen(port, () => console.log('REST API server ready at: http://localhost:3000'));
