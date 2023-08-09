"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.readUsers = exports.createUser = void 0;
const __1 = require("../..");
const createUser = async (req, res, next) => {
    try {
        const { name, password, email } = req.body;
        const result = await __1.prisma.user.create({
            data: {
                name,
                password,
                email
            }
        });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.createUser = createUser;
const readUsers = async (req, res, next) => {
    try {
        const result = await __1.prisma.user.findMany();
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.readUsers = readUsers;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, password, email } = req.body;
        const result = await __1.prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                password,
                email
            }
        });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await __1.prisma.user.delete({
            where: {
                id: id
            }
        });
        console.log("🚀 ~ file: index.ts:58 ~ deleteUser ~ result:", result);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
