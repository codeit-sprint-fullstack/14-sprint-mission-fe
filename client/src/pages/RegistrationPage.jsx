import Input from '../components/form/Input.jsx'
import Textarea from '../components/form/Textarea.jsx'
import TagInput from '../components/form/TagInput.jsx'

import styles from './RegistrationPage.module.css'

function RegistrationPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <header className={styles.header}>
          <h2 className={styles.title}>상품 등록하기</h2>
          <button className={styles.submitBtn}>제출</button>
        </header>
        <Input 
          label='상품명'
          id='name'
          type='text'
          placeholder='상품명을 입력해주세요'
        />
        <Textarea 
          label='상품 소개'
          id='description'
          placeholder='상품 소개를 입력해주세요'
        />
        <Input 
          label='판매 가격'
          id='price'
          type='text'
          placeholder='판매 가격을 입력해주세요'
        />
        <TagInput 
          label='태그'
          id='tags'
          type='text'
          placeholder='태그를 입력해주세요'
        />
      </form>
    </div>
  )
}

export default RegistrationPage