import { FormEvent, useMemo, useState } from 'react'
import { useCartContext } from '../../context/cartContext'
import { createOrder } from '../../pages/orders/service/mapper'
import { OrderInfo } from '../../types/order'
import { addOrder } from '../../api/apiOrders'
import { useNavigate } from 'react-router-dom'

import './buy-form.scss'
import classNames from 'classnames'
import { FormErrors } from '../../types/service'

export type FormStateErrors = {
    customer_name?: FormErrors
    delivery_address?: FormErrors
    customer_email?: FormErrors
    phone_number?: FormErrors
}

export const BuyForm = () => {
    const { cart, setCart } = useCartContext()
    const [formState, setFormState] = useState({} as OrderInfo)
    const navigate = useNavigate()
    const [errors, setErrors] = useState({} as FormStateErrors)

    const hasError = useMemo(() => {
        return Object.values(errors).some((error) => !!error)
    }, [errors])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        if (!hasError) {
            const order = createOrder(cart, formState)
            addOrder(order)
                .then(() => {
                    setCart([])
                    navigate('/success')
                })
                .catch(() => navigate('/error'))
        }
    }

    const updateFormField = (event: FormEvent) => {
        setFormState((prev) => ({
            ...prev,
            [(event.target as HTMLInputElement).name]: (
                event.target as HTMLInputElement
            ).value,
        }))
    }

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const isValidEmail = emailRegex.test(formState.customer_email)

        setErrors((prev) => ({
            ...prev,
            customer_email: isValidEmail ? undefined : FormErrors.EMAIL,
        }))
    }

    const validatePhoneNumber = () => {
        const phoneRegex = /^\+380\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/

        const isValidPhoneNumber = phoneRegex.test(
            formState.phone_number.replace(/[()-]/g, '')
        )

        setErrors((prev) => ({
            ...prev,
            phone_number: isValidPhoneNumber ? undefined : FormErrors.PHONE,
        }))
    }

    const validateNotEmpty = (field: keyof OrderInfo) => {
        setErrors((prev) => ({
            ...prev,
            [field]: formState[field] ? undefined : FormErrors.EMPTY,
        }))
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__container">
                <input
                    type="text"
                    className={classNames('form__input name', {
                        'form__input--error': errors.customer_name,
                    })}
                    name="customer_name"
                    placeholder="Your name"
                    onChange={updateFormField}
                    onBlur={() => validateNotEmpty('customer_name')}
                />
                <input
                    type="text"
                    className={classNames('form__input address', {
                        'form__input--error': errors.delivery_address,
                    })}
                    name="delivery_address"
                    placeholder="Address"
                    onChange={updateFormField}
                    onBlur={() => validateNotEmpty('delivery_address')}
                />
                <input
                    type="email"
                    name="customer_email"
                    className={classNames('form__input email', {
                        'form__input--error': errors.customer_email,
                    })}
                    placeholder="example@gmail.com"
                    onBlur={validateEmail}
                    onChange={updateFormField}
                />
                <input
                    type="phone"
                    className={classNames('form__input phone', {
                        'form__input--error': errors.phone_number,
                    })}
                    name="phone_number"
                    placeholder="+380 (__) - (___) - (__) - (__)"
                    onChange={updateFormField}
                    onBlur={validatePhoneNumber}
                />
                {hasError && (
                    <div className="error-alert">
                        {Object.values(errors).map(
                            (error) =>
                                error && (
                                    <p className="error-alert__message">
                                        ❌ {error}
                                    </p>
                                )
                        )}
                    </div>
                )}
            </div>
            <button
                className="button button--buy"
                disabled={hasError}
                type="submit"
            >
                Buy Now
            </button>
        </form>
    )
}
