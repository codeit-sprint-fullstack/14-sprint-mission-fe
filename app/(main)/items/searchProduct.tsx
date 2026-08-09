"use client"
import { useState } from "react"
import ItemList from "@/app/components/ItemList";
import { Product } from "@/app/components/ItemCard";


export const SearchProduct = ({initialProducts} : {initialProducts : Product[]}) => {
    const [search, setSearch] = useState("");
    const [Products, setProducts] = useState(initialProducts);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const res = await fetch(`http://localhost:4000/products?search=${e.target.value}`);
        const data = await res.json();
        setProducts(data.products);
    };


    return (
        <div>
        <input onChange={handleChange}/>
        <ItemList products={Products}/>
        </div>
    )
}



export default SearchProduct;
