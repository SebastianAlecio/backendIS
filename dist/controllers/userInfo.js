"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const user_1 = require("../models/user");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    const userInfo = yield user_1.User.findOne({ where: { username: username } });
    if (!userInfo) {
        return res.status(400).json({
            msg: `There is no user with the name ${username}`
        });
    }
    console.log("informacion: ");
    console.log(userInfo);
    res.json({ userInfo });
});
exports.getUser = getUser;
