import { create } from 'zustand';

// Slices
import { useShoppingCartStore } from './useShoppingCartStore';
import { useOrderStore } from './useOrderStore';

export const useBoundStore = create((set, get) => ({
    ...useShoppingCartStore(set, get),
    ...useOrderStore(set, get)
}));
