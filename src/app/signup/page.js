import AuthPageLayout from "@/components/auth/AuthPageLayout/AuthPageLayout";
import SignUpForm from "@/components/auth/SignUpForm/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthPageLayout
      description="이미 회원이신가요?"
      linkText="로그인"
      linkHref="/signin"
    >
      <SignUpForm />
    </AuthPageLayout>
  );
}
