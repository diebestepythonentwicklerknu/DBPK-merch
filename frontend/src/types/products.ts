export type Product = {
    id: string,
    name: string,
    size: string,
    quantity: number,
    price: number,
    photos: string[],
}

export type UpdatedProduct = {
    name?: string,
    size?: string,
    quantity?: number,
    price?: number,
    photos?: string[],
}