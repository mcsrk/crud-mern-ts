const initialState = {
    cart: [],
    cartTotal: 0
};

export const useShoppingCartStore = (set, get) => ({
    /** State */
    ...initialState,

    /** Methods */
    isProductInCart: (productId) => {
        const { cart } = get();
        return cart.some((product) => product.id === productId);
    },

    addProductToCart: (product) =>
        set((state) => {
            const updatedCart = [...state.cart, product];
            const updatedCartTotal = parseFloat(state.cartTotal) + parseFloat(product.total);
            return {
                ...state,
                cart: updatedCart,
                cartTotal: parseFloat(updatedCartTotal.toFixed(2))
            };
        }),

    removeProductFromCart: (productId) =>
        set((state) => {
            const updatedCart = state.cart.filter((product) => product.id !== productId);
            const updatedCartTotal = updatedCart.reduce((acc, product) => acc + parseFloat(product.total), 0);
            return {
                ...state,
                cart: updatedCart,
                cartTotal: parseFloat(updatedCartTotal.toFixed(2))
            };
        }),

    cleanCart: () => set(initialState)
});
