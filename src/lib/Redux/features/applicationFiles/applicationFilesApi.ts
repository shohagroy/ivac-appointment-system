import { baseApiSlice } from "../baseApi/baseApiSlice";

const applicationFilesApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFile: builder.mutation({
      query: (data) => ({
        url: "/application-files",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["application-files"],
    }),

    updateFile: builder.mutation({
      query: (data) => ({
        url: "/application-files",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["application-files", "service-slug"],
    }),

    deleteFile: builder.mutation({
      query: (data) => ({
        url: "/application-files",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["application-files"],
    }),

    getAllFiles: builder.query({
      query: () => ({
        url: "/application-files",
        method: "GET",
      }),
      providesTags: ["application-files"],
    }),
  }),
});

export const {
  useCreateFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
  useGetAllFilesQuery,
} = applicationFilesApi;
