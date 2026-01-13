import { CategoryUpsertDTO } from '../repositories/categoryRepository';
export declare function createCategory({ name, color }: CategoryUpsertDTO): Promise<{
    name: string;
    id: string;
    color: string;
}>;
export declare function deleteCategory(id: string): Promise<{
    name: string;
    id: string;
    color: string;
}>;
export declare function listCategories(): Promise<{
    name: string;
    id: string;
    color: string;
}[]>;
export declare function updateCategory(id: string, category: CategoryUpsertDTO): Promise<{
    name: string;
    id: string;
    color: string;
}>;
//# sourceMappingURL=categoryService.d.ts.map