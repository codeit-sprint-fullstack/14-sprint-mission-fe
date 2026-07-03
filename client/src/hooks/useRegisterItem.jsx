import { useActionState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

import axios from '../utils/axios.js'

function useRegisterItem(tags) {
  const initialState = {
    errors: {},
    itemId: null,
  }

  const navigate = useNavigate()

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name')
      const description = formData.get('description')
      const price = formData.get('price')

      const errors = {}

      if (name.length < 1) {
        errors.name = '1자 이상 입력해주세요'
      } else if (name.length > 10) {
        errors.name = '10자 이내로 입력해주세요'
      }

      if (description.length < 10) {
        errors.description = '10자 이상 입력해주세요'
      } else if (description.length > 100) {
        errors.description = '100자 이내로 입력해주세요'
      }

      if (isNaN(Number(price))) {
        errors.price = '숫자로 입력해주세요'
      } else if (Number(price) < 1) {
        errors.price = '1원 이상 입력해주세요'
      }

      if (tags.length < 1) {
        errors.tags = '태그를 1개 이상 입력해주세요'
      } else if (tags.some((tag) => tag.length > 5)) {
        errors.tags = '5글자 이내로 입력해주세요'
      }

      if (Object.keys(errors).length > 0) {
        return {
          errors,
          itemId: null,
        }
      }

      try {
        const res = await axios.post('/products', {
          name,
          description,
          price: Number(price),
          tags,
        })
        return {
          errors: {},
          itemId: res.data._id
        }
      } catch (err) {
        return {
          errors: {},
          itemId: null,
        }
      }
    },
    initialState
  )

  useEffect(() => {
    if (state.itemId) {
      navigate(`/items/${state.itemId}`)
    }
  }, [navigate, state.itemId])

  return {
    state,
    formAction,
    isPending,
  }
}

export default useRegisterItem