import { baseApi } from "./baseApi";
import type { Category, CategoryUpsertDTO } from "../types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: `/categories`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Categories" as const, id: "LIST" },
              ...result.map((c) => ({ type: "Categories" as const, id: c.id })),
            ]
          : [{ type: "Categories" as const, id: "LIST" }],
    }),
    getCategoryById: builder.query<Category, string>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
      }),
      providesTags: (_result, _error, categoryId) => [
        { type: "Categories", id: categoryId },
      ],
    }),
    createCategory: builder.mutation<Category, CategoryUpsertDTO>({
      query: (category) => ({
        url: `/categories`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Categories"]),
    }),
    updateCategory: builder.mutation<
      Category,
      CategoryUpsertDTO & { id: string }
    >({
      query: (category) => ({
        url: `/categories/${category.id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Categories"]),
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Categories"]),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
