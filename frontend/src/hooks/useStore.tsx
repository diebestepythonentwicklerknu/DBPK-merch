import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/apiProducts";
import { Product } from "../types/products";

export const useStore = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        getProducts()
        .then((response) => 
            setProducts(response));
    }, []);

    const filteredProducts = useMemo(() => {
        return products
            .filter(product => query ? product.name.toLowerCase().includes(query.toLowerCase()) : product)
            .filter(product => size ? product.size === size : product)
            .filter(product => price > 0 ? product.price <= price : product);
    }, [query, size, price, products]);

    return {
        products,
        setProducts,
        setQuery,
        setSize,
        setPrice,
        filteredProducts
    }
}