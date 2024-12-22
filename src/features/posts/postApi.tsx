import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

type ApiResponse<T> = {
    data: T;
    error?: string;
};

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: async ({ url, method = 'GET', body }: FetchArgs): Promise<ApiResponse<any>> => {
        try {
            const response = await axiosInstance({
                url,
                method,
                data: body,
            });
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response?.data || error.message || 'Unknown error', data: error };
        }
    },
    endpoints: (builder) => ({
        fetchPosts: builder.query<any, void>({
            query: () => ({ url: '/posts' }),  
        }),
        addPost: builder.mutation<any, { title: string; completed: boolean; userId: number }>({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            }),
        }),
    }),
});

export const { useFetchPostsQuery, useAddPostMutation } = postsApi;
