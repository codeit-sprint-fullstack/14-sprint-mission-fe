import AuthPageLayout from "@/components/auth/AuthPageLayout/AuthPageLayout";
import SignInForm from "@/components/auth/SignInForm/SignInForm";

export default function SignInPage() {
  return (
    <AuthPageLayout
      description="판다마켓이 처음이신가요?"
      linkText="회원가입"
      linkHref="/signup"
    >
      <SignInForm />
    </AuthPageLayout>
  );
}
