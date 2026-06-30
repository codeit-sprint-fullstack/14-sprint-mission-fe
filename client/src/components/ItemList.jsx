function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ListItem({ item }) {
    return (
        <li>
            <img src="" alt={item.title} />
            <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <p>{formatDate(item.createdAt)}</p>
                <p>{item.tags}</p>
            </div>
        </li>
    );
}

function ItemList({ items }) {
    return <ul>
        {items.map((item) => (
            <ListItem item={item} />
        ))}
    </ul>
}

export default ItemList