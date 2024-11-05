
import ItemData from "./ItemData"
export default function ItemList({Dairydata,isLoggedIn}){
    return(
        <section className="ItemList">
            {Dairydata.map(products => (
                <ItemData key={products.id} product={products} isLoggedIn={isLoggedIn} />
            ))}
        </section>
    )
}

