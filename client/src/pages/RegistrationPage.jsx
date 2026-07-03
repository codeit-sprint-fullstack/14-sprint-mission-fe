import { useState } from 'react'

import Input from '../components/form/Input.jsx'
import Textarea from '../components/form/Textarea.jsx'
import TagInput from '../components/form/TagInput.jsx'

import styles from './RegistrationPage.module.css'

function RegistrationPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState([])

  const isFormEmpty =
    name === '' ||
    description === '' ||
    price === '' ||
    tags.length === 0

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <header className={styles.header}>
          <h2 className={styles.title}>상품 등록하기</h2>
          <button 
            className={styles.submitBtn}
            type='submit'
            disabled={isFormEmpty}
          >
            제출
          </button>
        </header>
        <Input 
          label='상품명'
          id='name'
          type='text'
          placeholder='상품명을 입력해주세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea 
          label='상품 소개'
          id='description'
          placeholder='상품 소개를 입력해주세요'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input 
          label='판매 가격'
          id='price'
          type='text'
          placeholder='판매 가격을 입력해주세요'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TagInput 
          label='태그'
          id='tags'
          type='text'
          placeholder='태그를 입력해주세요'
          tags={tags}
          setTags={setTags}
        />
      </form>
    </div>
  )
}

export default RegistrationPage