import { Request, Response } from 'express';
import {Recipe} from '../models/recipe';
export const getViewRecipe =async (req: Request, res:Response) => {
    const { food_name } = req.query;

    const RecipeInfo: any = await Recipe.findAll({  where: { username: food_name } });
    if(!RecipeInfo) {
        return res.status(400).json({
            msg: `There is no user with the name ${food_name}`
        })
    } 
    console.log("informacion: ");
    console.log(RecipeInfo);
    res.json({RecipeInfo});
}