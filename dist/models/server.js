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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const user_2 = require("./user");
const recipe_1 = require("./recipe");
const recipe_2 = __importDefault(require("../routes/recipe"));
const recipeNew_1 = __importDefault(require("../routes/recipeNew"));
const path = require("path");
const parentDirectory = path.join(__dirname, '../../');
const bodyParser = require('body-parser');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        //this.app.use('/galeria', express.static(path.join(parentDirectory, 'galeria')));
        this.app.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });
    }
    routes() {
        this.app.use('/menu', recipe_2.default);
        this.app.use('/users', user_1.default);
        this.app.use('/recipe', recipeNew_1.default);
        this.app.get('/galeria/:imagen', (req, res) => {
            const imagen = req.params.imagen;
            const imagenPath = path.join(__dirname, '../../dist/galeria', imagen);
            res.sendFile(imagenPath);
        });
    }
    midlewares() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield recipe_1.Recipe.sync();
                yield user_2.User.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database: ', error);
            }
        });
    }
}
exports.Server = Server;
exports.default = Server;
