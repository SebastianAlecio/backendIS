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
const multer_1 = __importDefault(require("multer"));
var filenameTimestamp = Date.now();
const path = require('path');
const storage = multer_1.default.diskStorage({
    destination: path.join(__dirname, '../../galeria'),
    filename: (req, file, cb) => {
        filenameTimestamp = Date.now();
        cb(null, `${filenameTimestamp}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avatar = `${filenameTimestamp}-${req.file.originalname}`;
    }
    finally {
    }
});
