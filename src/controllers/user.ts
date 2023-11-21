import { Request, Response } from 'express' 
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import  Multer  from "multer";


export const newUser = async (req: Request, res: Response) => {
    //console.log(req.body);

    const { username }  = req.body;

    const { avatar } = req.body;


    //VALIDACION SI UN USUARIO YA ESTA EN LA BASE DE DATOS
    const user = await User.findOne({  where: { username: username } })
    if(user) {
        return res.status(400).json({
            msg: `A user with the username ${username} already exists`
        })
    }

    


    const matches = avatar.match(/^data:(.+);base64,(.+)$/);
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
    

    try{
        //const avatar = `${filenameTimestamp}-${req.file?.originalname}`;
        //console.log("Contenido de avatar" + avatar);
        const { name, password, date, gender, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
            //GUARDAR USUARIO
        try {
            await User.create({
                avatar: fileName,
                name: name,
                password: hashedPassword,
                date: date,
                gender: gender,
                username: username    
            })
        
            res.json({
                msg: `User ${username} created successfully!`
            })
        } catch (error) {
            console.log("Primer error" + error);
            res.status(400).json({
                msg: 'Ocurrio un error',
                error
            })
        }
    } catch(error) {
        console.log("Segundo error" + error);
        res.status(400).json({
            msg: 'Failed to load image',
            error
        })
    }

    


}




export const loginUser = async (req: Request, res: Response) => {
    //console.log(req.body);

    const { username, password } = req.body;

    //Validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({  where: { username: username } });

    if(!user) {
        return res.status(400).json({
            msg: `There is no user with the name ${username}`
        })
    }

    //Validamos password
    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValid) {
        
        return res.status(400).json({
            msg: `Incorrect Password`
        })
    }

    //Generamos token
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'castillo123');

    res.json(token);
}
