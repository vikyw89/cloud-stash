"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
const __1 = require("../..");
const createCompany = async (req, res, next) => {
    try {
        const { name } = req.body;
        const result = await __1.prisma.company.create({
            data: {
                name
            }
        });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.createCompany = createCompany;
