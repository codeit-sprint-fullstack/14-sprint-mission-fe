import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/app/getQueryClient'
import {
  INITIAL_BEST_PRODUCT_PARAMS,
  INITIAL_PRODUCT_LIST_PARAMS,
} from '@/constants/productConfig'
import {
  getBestProductQueryOptions,
  getProductListQueryOptions,
} from '@/queries/productQueries'
import ItemsClient from './ItemsClient'

export const dynamic = 'force-dynamic'

async function ItemsPage() {
  const queryClient = getQueryClient()

  await Promise.all([
    queryClient.prefetchQuery(
      getProductListQueryOptions(INITIAL_PRODUCT_LIST_PARAMS),
    ),
    queryClient.prefetchQuery(
      getBestProductQueryOptions(INITIAL_BEST_PRODUCT_PARAMS),
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemsClient />
    </HydrationBoundary>
  )
}

export default ItemsPage
