"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMany = findMany;
exports.findById = findById;
exports.create = create;
exports.deleteNote = deleteNote;
exports.update = update;
const db_1 = require("../lib/db");
async function findMany() {
    return await db_1.db.category.findMany();
}
async function findById(id) {
    return await db_1.db.category.findUnique({
        where: {
            id,
        },
    });
}
async function create(category) {
    return await db_1.db.category.create({
        data: category,
    });
}
async function deleteNote(id) {
    return await db_1.db.category.delete({
        where: { id },
    });
}
async function update(id, category) {
    return db_1.db.category.update({
        where: { id },
        data: category,
    });
}
//# sourceMappingURL=categoryRepository.js.map