import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Create API
export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ecommerceusingmern.herokuapp.com' }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        //Create product
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products/addnewproduct',
                body: product,
                method: "POST",
            }),
        }),

        //Delete product
        deleteProduct: builder.mutation({
            query: ({product_id, user_id}) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),

        //Update product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),

        //add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/addtocart",
                body: cartInfo,
                method: "POST",
            }),
        }),

        //remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/removefromcart",
                body,
                method: "POST",
            }),
        }),

        //cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increasecart",
                body,
                method: "POST",
            }),
        }),

        //cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decreasecart",
                body,
                method: "POST",
            }),
        }),

        //create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation
} = appApi;

export default appApi;