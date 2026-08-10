import ItemList from "@/app/components/ItemList";
import Link from "next/link";
import { SearchProduct } from "./searchProduct";

type SearchParams = {
    page: string;
    search?: string;
}

const ItemPage = async ({searchParams} : {searchParams: Promise<SearchParams>}) =>{
    const {page} = await searchParams;
    const limit = 2;
    const res = await fetch(`http://localhost:4000/products?page=${page}&limit=${limit}`);
    const {count, products} = await res.json();
    const totalPages = Math.ceil(count / limit);
    
    return (
        <div>
        <h4>베스트상품</h4>

        <h4>판매 중인 상품</h4>
        <SearchProduct initialProducts={products}/>
        <div>
            {Array.from({length: totalPages}, (_,i)=>i+1).map(pageNum => (
                <Link key={pageNum} href={`/items?page=${pageNum}`}>{pageNum}</Link>))}
        </div>
        </div>
    )

}


export default ItemPage;