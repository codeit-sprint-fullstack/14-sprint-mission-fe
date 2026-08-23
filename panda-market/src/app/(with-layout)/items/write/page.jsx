'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from '@/api/productApi'
import {
  getBestProductRootQueryKey,
  getProductDetailQueryKey,
  getProductListRootQueryKey,
} from '@/constants/queryKeys'
import { getProductDetailQueryOptions } from '@/queries/productQueries'
import { getUserProfileQueryOptions } from '@/queries/userQueries'

function ProductWritePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const itemId = searchParams.get('id')
  const isEditMode = itemId !== null
  const isValidItemId = /^\d+$/.test(itemId ?? '') && Number(itemId) > 0

  const [accessToken, setAccessToken] = useState(undefined)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productTags, setProductTags] = useState([])
  const [productImages, setProductImages] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [tagError, setTagError] = useState('')
  const initializedItemIdRef = useRef(null)

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'))
  }, [])

  useEffect(() => {
    initializedItemIdRef.current = null
  }, [itemId])

  const {
    data: product,
    error: productError,
    isPending: isProductPending,
    isError: isProductError,
  } = useQuery({
    ...getProductDetailQueryOptions(itemId),
    enabled: isEditMode && isValidItemId && Boolean(accessToken),
  })

  const {
    data: user,
    error: userError,
    isPending: isUserPending,
    isError: isUserError,
  } = useQuery({
    ...getUserProfileQueryOptions(),
    enabled: isEditMode && isValidItemId && Boolean(accessToken),
  })

  useEffect(() => {
    if (!product || initializedItemIdRef.current === itemId) return

    setProductName(product.name ?? '')
    setProductDescription(product.description ?? '')
    setProductPrice(String(product.price ?? ''))
    setProductTags(Array.isArray(product.tags) ? product.tags : [])
    setProductImages(Array.isArray(product.images) ? product.images : [])
    initializedItemIdRef.current = itemId
  }, [product, itemId])

  const isOwner =
    product?.ownerId != null &&
    user?.id != null &&
    String(product.ownerId) === String(user.id)
  const trimmedProductName = productName.trim()
  const trimmedProductDescription = productDescription.trim()
  const numericProductPrice = Number(productPrice)
  const areTagsValid =
    productTags.length > 0 &&
    productTags.every((tag) => {
      const trimmedTag = tag.trim()

      return trimmedTag.length >= 1 && trimmedTag.length <= 20
    })
  const isProductFormValid =
    trimmedProductName.length >= 1 &&
    trimmedProductName.length <= 30 &&
    trimmedProductDescription.length >= 1 &&
    productPrice.trim() !== '' &&
    Number.isInteger(numericProductPrice) &&
    numericProductPrice >= 0 &&
    productImages.length >= 1 &&
    areTagsValid

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: async (updatedProduct) => {
      queryClient.setQueryData(getProductDetailQueryKey(itemId), (prev) => ({
        ...prev,
        ...updatedProduct,
        isFavorite: prev?.isFavorite ?? updatedProduct.isFavorite,
      }))

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getProductListRootQueryKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: getBestProductRootQueryKey(),
        }),
      ])

      router.push(`/items/${itemId}`)
    },
  })

  const canUpdateProduct =
    isEditMode &&
    isValidItemId &&
    isOwner &&
    isProductFormValid &&
    !updateProductMutation.isPending

  function handleAddTag() {
    const nextTag = tagInput.trim()

    if (!nextTag) {
      setTagError('태그를 입력해 주세요.')
      return
    }

    if (nextTag.length > 20) {
      setTagError('태그는 20자 이하로 입력해 주세요.')
      return
    }

    if (productTags.includes(nextTag)) {
      setTagError('이미 추가한 태그입니다.')
      return
    }

    setProductTags((prev) => [...prev, nextTag])
    setTagInput('')
    setTagError('')
  }

  function handleTagInputKeyDown(e) {
    if (e.key !== 'Enter') return

    e.preventDefault()
    handleAddTag()
  }

  function handleDeleteTag(tagToDelete) {
    if (updateProductMutation.isPending) return

    setProductTags((prev) => prev.filter((tag) => tag !== tagToDelete))
    setTagError('')
  }

  function handleProductSubmit(e) {
    e.preventDefault()

    if (!canUpdateProduct) return

    updateProductMutation.mutate({
      productId: itemId,
      product: {
        name: trimmedProductName,
        description: trimmedProductDescription,
        price: numericProductPrice,
        tags: productTags.map((tag) => tag.trim()),
        images: productImages,
      },
    })
  }

  if (isEditMode && !isValidItemId) {
    return <p role="alert">유효하지 않은 상품 ID입니다.</p>
  }

  if (isEditMode && accessToken === undefined) {
    return <p role="status">로그인 상태를 확인하고 있습니다.</p>
  }

  if (isEditMode && !accessToken) {
    return <p role="alert">상품을 수정하려면 로그인이 필요합니다.</p>
  }

  if (isEditMode && (isProductPending || isUserPending)) {
    return <p role="status">상품 정보를 불러오고 있습니다.</p>
  }

  if (isEditMode && isProductError) {
    return (
      <p role="alert">
        {productError.status === 404
          ? '수정할 상품을 찾을 수 없습니다.'
          : productError.message}
      </p>
    )
  }

  if (isEditMode && isUserError) {
    return <p role="alert">{userError.message}</p>
  }

  if (isEditMode && !isOwner) {
    return <p role="alert">이 상품을 수정할 권한이 없습니다.</p>
  }

  return (
    <section aria-labelledby="product-write-title">
      <form onSubmit={handleProductSubmit}>
        <header>
          <h1 id="product-write-title">
            {isEditMode ? '상품 수정하기' : '상품 등록하기'}
          </h1>
          <button
            type="submit"
            disabled={isEditMode ? !canUpdateProduct : true}
          >
            {isEditMode
              ? updateProductMutation.isPending
                ? '수정 중...'
                : '수정'
              : '등록'}
          </button>
        </header>

        <div>
          <label htmlFor="product-image">상품 이미지</label>
          {isEditMode && (
            <div>
              {productImages.map((imageUrl, index) => (
                <img
                  key={`${imageUrl}-${index}`}
                  src={imageUrl}
                  alt={`${productName || '상품'} 기존 이미지 ${index + 1}`}
                  width="160"
                  height="120"
                />
              ))}
            </div>
          )}
          <input
            id="product-image"
            name="image"
            type="file"
            disabled={isEditMode}
          />
          {isEditMode && <p>수정 모드에서는 이미지를 변경할 수 없습니다.</p>}
        </div>

        <div>
          <label htmlFor="product-name">상품명</label>
          <input
            id="product-name"
            name="name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={updateProductMutation.isPending}
          />
        </div>

        <div>
          <label htmlFor="product-description">상품 소개</label>
          <textarea
            id="product-description"
            name="description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            disabled={updateProductMutation.isPending}
          />
        </div>

        <div>
          <label htmlFor="product-price">판매가격</label>
          <input
            id="product-price"
            name="price"
            type="number"
            min="0"
            step="1"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            disabled={updateProductMutation.isPending}
          />
        </div>

        <div>
          <label htmlFor="product-tags">태그</label>
          <input
            id="product-tags"
            name="tags"
            type="text"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value)
              setTagError('')
            }}
            onKeyDown={handleTagInputKeyDown}
            disabled={!isEditMode || updateProductMutation.isPending}
          />
          {isEditMode && (
            <button
              type="button"
              onClick={handleAddTag}
              disabled={updateProductMutation.isPending}
            >
              태그 추가
            </button>
          )}
          {tagError && <p role="alert">{tagError}</p>}
          {isEditMode && (
            <ul>
              {productTags.map((tag) => (
                <li key={tag}>
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteTag(tag)}
                    disabled={updateProductMutation.isPending}
                    aria-label={`${tag} 태그 삭제`}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {updateProductMutation.isError && (
          <p role="alert">
            {updateProductMutation.error.status === 403
              ? '이 상품을 수정할 권한이 없습니다.'
              : updateProductMutation.error.status === 404
                ? '수정할 상품을 찾을 수 없습니다.'
                : updateProductMutation.error.message}
          </p>
        )}
      </form>
    </section>
  )
}

function ProductWritePage() {
  return (
    <Suspense fallback={<p role="status">페이지를 불러오고 있습니다.</p>}>
      <ProductWritePageContent />
    </Suspense>
  )
}

export default ProductWritePage
