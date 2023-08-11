"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = require("./user");
const account_1 = require("./account");
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.send('api');
});
router.post('/account/signin', account_1.signIn);
router.get('/account/refreshAccessToken');
router.post('/user', user_1.createUser);
// protected route
// authenticate refresh and jwt token
router.use(authentication_1.authenticateRefreshToken);
router.use(authentication_1.authenticateAccessToken);
router.post('/account/signout', account_1.signOut);
router.get('/user', user_1.readUsers);
router.get('/user/:id', user_1.readUser);
router.put('/user/:id', user_1.updateUser);
router.delete('/user/:id', user_1.deleteUser);
