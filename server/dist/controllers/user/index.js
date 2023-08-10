"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.readUser = exports.readUsers = exports.createUser = void 0;
const __1 = require("../..");
const bcrypt_1 = require("bcrypt");
const SALT_ROUND = process.env.SALT_ROUND || 10;
const createUser = async (req, res, next) => {
    try {
        const { name, password, email } = req.body;
        const result = await __1.prisma.user.create({
            data: {
                name,
                password: await (0, bcrypt_1.hash)(password, +SALT_ROUND),
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
const readUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await __1.prisma.user.findFirst({
            where: {
                id
            }
        });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.readUser = readUser;
const updateUser = async (req, res, next) => {
    try {
        const user = req.user;
        console.log("🚀 ~ file: index.ts:49 ~ updateUser ~ user:", user);
        const { id } = req.params;
        if (id !== user.id)
            return res.send('unauthorized access');
        const { name, password, email } = req.body;
        const result = await __1.prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                password: await (0, bcrypt_1.hash)(password, +SALT_ROUND),
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
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
