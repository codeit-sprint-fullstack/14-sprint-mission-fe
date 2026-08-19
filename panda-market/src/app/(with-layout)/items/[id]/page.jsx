import ItemDetailClient from './ItemDetailClient'

async function ItemDetailPage({ params }) {
  const { itemId } = await params

  return <ItemDetailClient itemId={itemId} />
}

export default ItemDetailPage
