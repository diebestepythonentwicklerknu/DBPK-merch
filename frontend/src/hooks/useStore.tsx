import { useEffect, useState } from 'react'
import { getProducts } from '../api/apiProducts'

export const useStore = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then((response) => setProducts(response))
    }, [])

    return {
        products,
        setProducts,
    }
}
