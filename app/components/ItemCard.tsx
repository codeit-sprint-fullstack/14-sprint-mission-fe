
export type Product = {
    id: number;
    name: string;
    price: number;
}

export const ItemCard = ({ product } : {product: Product}) => {
  return ( 
    <div>
        <p>{product.name}</p>
        <h1>{product.price}</h1>
    </div>

)}

export default ItemCard;