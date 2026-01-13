"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.listCategories = void 0;
const categoryService = __importStar(require("../services/categoryService"));
const requestHandler_1 = require("../utils/requestHandler"); // ruta donde pongas el helper
exports.listCategories = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const categories = await categoryService.listCategories();
    res.json(categories);
}, 'Error listing categories');
exports.createCategory = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const { name, color } = req.body;
    const category = await categoryService.createCategory({ name, color });
    res.json(category);
}, 'Error creating category');
exports.updateCategory = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Missing category id' });
    }
    const { name, color } = req.body;
    const category = await categoryService.updateCategory(id, { name, color });
    res.json(category);
}, 'Error updating category');
exports.deleteCategory = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Missing category id' });
    }
    const result = await categoryService.deleteCategory(id);
    res.json(result);
}, 'Error deleting category');
//# sourceMappingURL=categoryController.js.map