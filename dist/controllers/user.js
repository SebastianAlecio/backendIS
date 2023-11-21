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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body);
    const { username } = req.body;
    const { avatar } = req.body;
    //VALIDACION SI UN USUARIO YA ESTA EN LA BASE DE DATOS
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `A user with the username ${username} already exists`
        });
    }
    const matches = avatar.match(/^data:(.+);base64,(.+)$/);
    const base64Image = matches[2];
    const buffer = Buffer.from(base64Image, 'base64');
    const fileExtension = matches[1].split('/')[1];
    const fs = require('fs');
    const timestamp = Date.now();
    const fileName = `${timestamp}.${fileExtension}`;
    fs.writeFile(__dirname + `../../galeria/${timestamp}.` + fileExtension, buffer, (err) => {
        if (err)
            throw err;
        console.log('The file has been saved!');
    });
    try {
        //const avatar = `${filenameTimestamp}-${req.file?.originalname}`;
        //console.log("Contenido de avatar" + avatar);
        const { name, password, date, gender, username } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        //GUARDAR USUARIO
        try {
            yield user_1.User.create({
                avatar: fileName,
                name: name,
                password: hashedPassword,
                date: date,
                gender: gender,
                username: username
            });
            res.json({
                msg: `User ${username} created successfully!`
            });
        }
        catch (error) {
            console.log("Primer error" + error);
            res.status(400).json({
                msg: 'Ocurrio un error',
                error
            });
        }
    }
    catch (error) {
        console.log("Segundo error" + error);
        res.status(400).json({
            msg: 'Failed to load image',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body);
    const { username, password } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `There is no user with the name ${username}`
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Incorrect Password`
        });
    }
    //Generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'castillo123');
    res.json(token);
});
exports.loginUser = loginUser;
