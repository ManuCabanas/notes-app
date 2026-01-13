"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMany = findMany;
exports.findById = findById;
exports.create = create;
exports.deleteNote = deleteNote;
exports.update = update;
const db_1 = require("../lib/db");
async function findMany(filter) {
    return await db_1.db.note.findMany({
        where: filter,
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}
async function findById(id) {
    return await db_1.db.note.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
}
async function create(note) {
    return await db_1.db.note.create({
        data: note,
        include: {
            category: true,
        },
    });
}
async function deleteNote(id) {
    return await db_1.db.note.delete({
        where: { id }
    });
}
async function update(id, note) {
    return db_1.db.note.update({
        where: { id },
        data: note,
        include: {
            category: true,
        },
    });
}
//# sourceMappingURL=noteRepository.js.map