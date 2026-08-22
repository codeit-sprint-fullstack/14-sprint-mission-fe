import ProductRegistrationForm from '@/components/ProductRegistrationForm';

export const metadata = {
  title: '상품 등록',
  description: '판다마켓에 판매할 상품을 등록하세요.',
};

export default function ProductRegistrationPage() {
  return (
    <main className="registration-main">
      <ProductRegistrationForm />
    </main>
  );
}
