export interface Product {
    id: string
    name: string
    size: string
    quantity: number
    price: number
    photos: string[]
}

export type UpdatedProduct = {
    name?: string
    size?: string
    quantity?: number
    price?: number
    photos?: string[]
}

export interface ProductCart extends Product {
    currentQuantity: number
}

export enum Sizes {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    ALL = 'All',
}
