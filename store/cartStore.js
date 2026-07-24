import { create } from "zustand";

const useCartStore = create((set) => ({
    cart: [],

    addToCart: (product) =>
        set((state) => {
            const exist = state.cart.find(
                (item) => item._id === product._id
            );

            if (exist) {
                return {
                    cart: state.cart.map((item) =>
                        item._id === product._id
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item
                    ),
                };
            }

            return {
                cart: [
                    ...state.cart,
                    {
                        ...product,
                        quantity: 1,
                    },
                ],
            };
        }),

    removeFromCart: (_id) =>
        set((state) => ({
            cart: state.cart.filter((item) => item._id !== _id),
        })),

    clearCart: () =>
        set({
            cart: [],
        }),

    increaseQuantity: (_id) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item._id === _id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            ),
        })),

    decreaseQuantity: (_id) =>
        set((state) => ({
            cart: state.cart
                .map((item) =>
                    item._id === _id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0),
        })),
}));

export default useCartStore;