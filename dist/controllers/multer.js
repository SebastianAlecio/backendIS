"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path = require('path');
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../galeria')); // Ajusta la ruta según tu estructura de carpetas
    },
    filename: (req, file, cb) => {
        const filenameTimestamp = Date.now();
        cb(null, `${filenameTimestamp}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
