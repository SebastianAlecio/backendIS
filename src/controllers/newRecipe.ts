
import { Recipe } from '../models/recipe';
import { Request, Response} from 'express';

export const newRecipe = async(req: Request, res: Response) => {
    const { img, name, description, ingredients, username } = req.body;


    const matches = img.match(/^data:(.+);base64,(.+)$/);
    const base64Image = matches[2];
    const buffer = Buffer.from(base64Image, 'base64');
    const fileExtension = matches[1].split('/')[1];
    const fs = require('fs');
    const timestamp = Date.now();
    const fileName = `${timestamp}.${fileExtension}`;
    fs.writeFile(__dirname+`../../galeria/${timestamp}.` + fileExtension, buffer, (err:any) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

    try {
        await Recipe.create({
            img: fileName,
            name: name,
            description: description,
            ingredients: ingredients,
            username:  username
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps an error ocurred',
            error
        })
    }

}