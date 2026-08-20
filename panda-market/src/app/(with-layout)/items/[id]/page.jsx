import ItemDetailClient from './ItemDetailClient'

async function ItemDetailPage({ params }) {
  const { id } = await params

  return <ItemDetailClient itemId={id} />
}

export default ItemDetailPage
