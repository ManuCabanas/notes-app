import { Prisma } from '@prisma/client';
export type CategoryUpsertDTO = Prisma.CategoryUncheckedCreateInput;
export declare function findMany(): Promise<{
    name: string;
    id: string;
    color: string;
}[]>;
export declare function findById(id: string): Promise<{
    name: string;
    id: string;
    color: string;
} | null>;
export declare function create(category: CategoryUpsertDTO): Promise<{
    name: string;
    id: string;
    color: string;
}>;
export declare function deleteNote(id: string): Promise<{
    name: string;
    id: string;
    color: string;
}>;
export declare function update(id: string, category: CategoryUpsertDTO): Promise<{
    name: string;
    id: string;
    color: string;
}>;
//# sourceMappingURL=categoryRepository.d.ts.map