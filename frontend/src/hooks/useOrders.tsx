import { useEffect, useState } from 'react'
import { getOrders } from '../api/apiOrders'

export const useOrders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getOrders().then((response) => {
            setOrders(response)
            setIsLoading(false)
        })
    }, [])

    return {
        orders,
        isLoading,
    }
}
