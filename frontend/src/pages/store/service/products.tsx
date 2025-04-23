import { Card } from "../../../components/card/card";
import { Product } from "../../../types/products";

export const renderProducts = (products: Product[]) => {
    return products.map((product) => (
        <Card product={product} key={`card_${product.id}`}/>
    ));
};