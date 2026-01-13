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
exports.createNote = createNote;
exports.deleteNote = deleteNote;
exports.listNotes = listNotes;
exports.updateNote = updateNote;
const noteRepository = __importStar(require("../repositories/noteRepository"));
async function createNote({ title, content, categoryId }) {
    if (!title || title.trim() === '') {
        throw new Error('Title is required.');
    }
    return await noteRepository.create({
        title,
        content: content ?? null,
        categoryId: categoryId ?? null,
    });
}
async function deleteNote(id) {
    return await noteRepository.deleteNote(id);
}
async function listNotes(status) {
    return await noteRepository.findMany({ status });
}
async function updateNote(id, note) {
    return await noteRepository.update(id, note);
}
//# sourceMappingURL=noteService.js.map