import { NoteStatus, Prisma } from '@prisma/client';
type NoteFindFilter = {
    status: NoteStatus;
};
export type NoteUpsertDTO = Prisma.NoteUncheckedCreateInput;
export declare function findMany(filter: NoteFindFilter): Promise<({
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
export declare function findById(id: string): Promise<({
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
}) | null>;
export declare function create(note: NoteUpsertDTO): Promise<{
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
export declare function update(id: string, note: NoteUpsertDTO): Promise<{
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
export {};
//# sourceMappingURL=noteRepository.d.ts.map