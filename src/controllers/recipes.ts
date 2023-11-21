import { Request, Response } from 'express';
import { Recipe } from '../models/recipe';

export const getRecipes = async (req: Request, res: Response) => {
    const listProducts = await Recipe.findAll();

    res.json(listProducts)
}