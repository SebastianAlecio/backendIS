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
exports.newRecipe = void 0;
const recipe_1 = require("../models/recipe");
const newRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { img, name, description, ingredients, username } = req.body;
    const matches = img.match(/^data:(.+);base64,(.+)$/);
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
        yield recipe_1.Recipe.create({
            img: fileName,
            name: name,
            description: description,
            ingredients: ingredients,
            username: username
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps an error ocurred',
            error
        });
    }
});
exports.newRecipe = newRecipe;
