import { NoteUpsertDTO } from '../repositories/noteRepository';
import { NoteStatus } from '@prisma/client';
export declare function createNote({ title, content, categoryId }: NoteUpsertDTO): Promise<{
    category: {
        name: string;
        id: string;
        color: string;
    } | null;
} & {
    id: string;
    title: string;
    content: string | null;
    status: import("@prisma/client").$Enums.NoteStatus;
    createdAt: Date;
    categoryId: string | null;
}>;
export declare function deleteNote(id: string): Promise<{
    id: string;
    title: string;
    content: string | null;
    status: import("@prisma/client").$Enums.NoteStatus;
    createdAt: Date;
    categoryId: string | null;
}>;
export declare function listNotes(status: NoteStatus): Promise<({
    category: {
        name: string;
        id: string;
        color: string;
    } | null;
} & {
    id: string;
    title: string;
    content: string | null;
    status: import("@prisma/client").$Enums.NoteStatus;
    createdAt: Date;
    categoryId: string | null;
})[]>;
export declare function updateNote(id: string, note: NoteUpsertDTO): Promise<{
    category: {
        name: string;
        id: string;
        color: string;
    } | null;
} & {
    id: string;
    title: string;
    content: string | null;
    status: import("@prisma/client").$Enums.NoteStatus;
    createdAt: Date;
    categoryId: string | null;
}>;
//# sourceMappingURL=noteService.d.ts.map