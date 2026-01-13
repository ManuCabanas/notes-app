import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use VITE_API_URL for production, fallback to /api for local dev (proxied by Vite)
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const baseApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Notes", "Categories"],
  endpoints: () => ({}),
});
