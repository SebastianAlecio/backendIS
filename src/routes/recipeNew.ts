import { Router } from 'express';
import { newRecipe } from '../controllers/newRecipe';

const router = Router();

router.post('/', newRecipe);


export default router;