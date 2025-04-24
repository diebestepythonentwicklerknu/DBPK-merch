import { FormEvent, useState } from "react";
import { useCartContext } from "../../context/cartContext";
import { createOrder } from "../../pages/orders/service/mapper";
import { OrderInfo } from "../../types/order";
import { addOrder } from "../../api/apiOrders";
import { useNavigate } from "react-router-dom";

export const BuyForm = () => {
    const { cart, setCart } = useCartContext();
    const [formState, setFormState] = useState({} as OrderInfo);
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const order = createOrder(cart, formState);
        addOrder(order)
        .then(() => {
            setCart([]);
            navigate('/success');
        })
        .catch(() => navigate('/error'));
    };

    const updateFormField = (event: FormEvent) => {
        setFormState((prev) => ({ ...prev, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value }));
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__container">
                <input type="text" className="form__input name" name="customer_name" onChange={updateFormField}/>
                <input type="text" className="form__input address" name="delivery_address" onChange={updateFormField}/>
                <input type="email" className="form__input email" name="customer_email" onChange={updateFormField}/>
                <input type="phone" className="form__input phone" name="phone_number"onChange={updateFormField} />
            </div>
            <button className="button button--buy" type="submit">
                Buy Now
            </button>
        </form>
    );
}