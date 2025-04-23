



// export const addToCart = (product: Product) => {
//     const cart = getCart();

//     cart.push(product);

//     sessionStorage.setItem(CART_STORAGE, JSON.stringify(cart));
// }

export const getSessionItems = <T>(storageName: string): T[] => {
    try {
        const storage = JSON.parse(sessionStorage.getItem(storageName) || "[]");

        return storage;
    } catch (error) {
        console.error("Error parsing session storage data:", error);
        return [];
    }
}

export const updateSessionItems = <T>(storageName: string, items: T[]) => {
    try {
        sessionStorage.setItem(storageName, JSON.stringify(items));
    } catch (error) {
        console.error("Error updating session storage data:", error);
    }
}

// export const removeFromCart = (productId: string) => {
//     const cart = getCart();

//     const updatedCart = cart.filter((product: Product) => product.id !== productId);

//     sessionStorage.setItem(CART_STORAGE, JSON.stringify(updatedCart));
// }

// export const isProductInCart = (productId: string) => {
//     const cart = getCart();

//     return cart.some((product: Product) => product.id === productId);
// }