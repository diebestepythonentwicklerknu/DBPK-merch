import { useEffect, useState } from "react";
import { getOrders } from "../api/apiOrders";

export const useOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
        .then((response) => 
            setOrders(response));
    }, []);

    return {
        orders,
    }
};