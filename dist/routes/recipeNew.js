"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newRecipe_1 = require("../controllers/newRecipe");
const router = (0, express_1.Router)();
router.post('/', newRecipe_1.newRecipe);
exports.default = router;
