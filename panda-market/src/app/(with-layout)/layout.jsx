import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import styles from '@/app/(with-layout)/layout.module.css'

function WithLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  )
}

export default WithLayout
