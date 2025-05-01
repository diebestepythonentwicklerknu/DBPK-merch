import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/apiProducts'
import { Product, Sizes } from '../types/products'

export const useStore = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [query, setQuery] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProducts()
            .then((response) => {
                setProducts(response)
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }, [])

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) =>
                query
                    ? product.name.toLowerCase().includes(query.toLowerCase())
                    : product
            )
            .filter((product) => {
                console.log(size)

                if (!size || size === Sizes.ALL) {
                    return product
                }

                return product.size === size
            })
            .filter((product) => (price > 0 ? product.price <= price : product))
    }, [query, size, price, products])

    return {
        products,
        setProducts,
        setQuery,
        setSize,
        setPrice,
        filteredProducts,
        isLoading,
    }
}
