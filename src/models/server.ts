import express, { Application } from 'express';
import cors from 'cors';
import routesUser from '../routes/user';
import { User } from './user';
import { Recipe } from './recipe'
import routerRecipes from '../routes/recipe';
import routerNewRecipe from '../routes/recipeNew'

const path = require("path");
const parentDirectory = path.join(__dirname, '../../');
const bodyParser = require('body-parser');

export class Server {
    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        //this.app.use('/galeria', express.static(path.join(parentDirectory, 'galeria')));
        this.app.listen(this.port, () => {
            console.log('Listening on port '+ this.port);
        })
    }

    routes() {
        this.app.use('/menu', routerRecipes)
        this.app.use('/users', routesUser);
        this.app.use('/recipe', routerNewRecipe);

        this.app.get('/galeria/:imagen', (req, res) => {
            const imagen = req.params.imagen;
            const imagenPath = path.join(__dirname, '../../dist/galeria', imagen);
            res.sendFile(imagenPath);
        });
    }

    midlewares() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express.json());

        this.app.use(cors());

        

        
    }

    async dbConnect() {
        try {
            await Recipe.sync();
            await User.sync();
        } catch(error) {
            console.error('Unable to connect to the database: ', error);
        }
    }

}

export default Server;