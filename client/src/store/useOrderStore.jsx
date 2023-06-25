const initialState = {
    order: {
        _id: '',
        total: 0,
        rate: 0,
        status: '',
        createdAt: '',
        updatedAt: '',
        products: []
    }
};

export const useOrderStore = (set, get) => ({
    /** State */
    ...initialState,

    /** Methods */
    setOrder: ({ _id, total, rate, status, createdAt, updatedAt, products }) =>
        set({
            order: {
                _id,
                products,
                total,
                rate,
                status,
                createdAt,
                updatedAt
            }
        }),

    isProductInOrder: (productId) => {
        const { products } = get().order;
        return products.some((product) => product.id === productId);
    },

    addProductToOrder: (product) =>
        set((state) => {
            const updatedProducts = [...state.order.products, product];
            const updatedTotal = parseFloat(state.order.total) + parseFloat(product.total);
            return {
                order: {
                    ...state.order,
                    products: updatedProducts,
                    total: parseFloat(updatedTotal.toFixed(2))
                }
            };
        }),

    removeProductFromOrder: (productId) =>
        set((state) => {
            const updatedProducts = state.order.products.filter((product) => product.id !== productId);
            const updatedTotal = updatedProducts.reduce((acc, product) => acc + parseFloat(product.total), 0);
            return {
                order: {
                    ...state.order,
                    products: updatedProducts,
                    total: parseFloat(updatedTotal.toFixed(2))
                }
            };
        }),

    resetOrder: () => set(initialState)
});
