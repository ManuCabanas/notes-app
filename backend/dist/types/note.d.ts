import { NoteStatus } from '@prisma/client';
export interface NoteUpsertDTO {
    title: string;
    content?: string | undefined;
    status?: NoteStatus | undefined;
    categoryId?: string | undefined;
}
//# sourceMappingURL=note.d.ts.map