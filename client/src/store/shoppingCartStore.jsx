import { create } from 'zustand';

const initialState = {
    cart: [],
    total: 0,
};

export const useShoppingCartStore = create((set, get) => ({
    /** State */
    cart: initialState.cart,
    total: initialState.total,

    /** Methods */
    isProductInCart: (productId) => {
        const { cart } = get();
        return cart.some((product) => product.id === productId);
    },

    addProductToCart: (product) => set((state) => ({ cart: [...state.cart, product], total: parseFloat(state.total + product.total).toFixed(2) })),
    removeProductFromCart: (productId) => set((state) => ({ cart: state.cart.filter((product) => product.id !== productId) })),
    cleanCart: () => set({ initialState }),
}));
