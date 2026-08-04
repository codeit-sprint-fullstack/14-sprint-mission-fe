import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
