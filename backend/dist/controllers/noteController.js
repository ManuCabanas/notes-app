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
exports.deleteNote = exports.updateNote = exports.createNote = exports.listNotes = void 0;
const client_1 = require("@prisma/client");
const noteService = __importStar(require("../services/noteService"));
const requestHandler_1 = require("../utils/requestHandler"); // ruta donde pongas el helper
exports.listNotes = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const archivedParam = req.query.status;
    const archived = archivedParam === 'ACTIVE' ? client_1.NoteStatus.ACTIVE : client_1.NoteStatus.INACTIVE;
    const notes = await noteService.listNotes(archived);
    res.json(notes);
}, 'Error listing notes');
exports.createNote = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const { title, content, categoryId } = req.body;
    const note = await noteService.createNote({ title, content, categoryId });
    res.json(note);
}, 'Error creating note');
exports.updateNote = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Missing note id' });
    }
    const { title, content, categoryId, status } = req.body;
    const note = await noteService.updateNote(id, { title, content, categoryId, status });
    res.json(note);
}, 'Error updating note');
exports.deleteNote = (0, requestHandler_1.handleRequest)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Missing note id' });
    }
    const result = await noteService.deleteNote(id);
    res.json(result);
}, 'Error deleting note');
//# sourceMappingURL=noteController.js.map