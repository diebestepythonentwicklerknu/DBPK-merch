import { useEffect, useState } from "react";
import { getProducts } from "../api/apiProducts";

export const useStore = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
        .then(data => setProducts(data));
    }, []);

    return {
        products,
        setProducts,
    }
}