import MainLayout from '../../components/layout/MainLayout'
import './ItemsPage.css'

const ItemsPage = () => {
  return (
    <MainLayout>
      <div className="items-page">
        <section className="items-section">
          <h2>베스트 상품</h2>
          <div className="best-products-grid"></div>
        </section>

        <section className="items-section">
          <h2>판매 중인 상품</h2>
          <div className="all-products-grid"></div>
        </section>
      </div>
    </MainLayout>
  )
}

export default ItemsPage
