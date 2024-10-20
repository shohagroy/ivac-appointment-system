import { baseApiSlice } from "../baseApi/baseApiSlice";

const clientApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createServiceSlug: builder.mutation({
      query: (data) => ({
        url: "/service-slug",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service-slug"],
    }),

    updateServiceSlug: builder.mutation({
      query: (data) => ({
        url: "/service-slug",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["service-slug"],
    }),

    deleteServiceSlug: builder.mutation({
      query: (data) => ({
        url: "/service-slug",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["service-slug"],
    }),

    getAllServiceSlug: builder.query({
      query: () => ({
        url: "/service-slug",
        method: "GET",
      }),
      providesTags: ["service-slug"],
    }),
  }),
});

export const {
  useCreateServiceSlugMutation,
  useUpdateServiceSlugMutation,
  useDeleteServiceSlugMutation,
  useGetAllServiceSlugQuery,
} = clientApi;
