import { Request, Response } from 'express';
import { User } from '../models/user';

export const getUser = async (req: Request, res: Response) => {
    const { username } = req.query;

    const userInfo: any = await User.findOne({  where: { username: username } });
    if(!userInfo) {
        return res.status(400).json({
            msg: `There is no user with the name ${username}`
        })
    } 
    console.log("informacion: ");
    console.log(userInfo);
    res.json({userInfo});
}
