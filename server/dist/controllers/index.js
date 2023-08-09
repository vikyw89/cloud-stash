"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = require("./user");
const router = new express_1.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.send('api');
});
router.get('/user', user_1.readUsers);
router.post('/user', user_1.createUser);
router.put('/user/:id', user_1.updateUser);
router.delete('/user/:id', user_1.deleteUser);
