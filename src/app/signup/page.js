import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Input from "@/components/Input";

export default function SignupPage() {
  return (
    <>
      <Header />
      <div className="subWrapper">
        <Input/>
      
      </div>
      <Footer />
    </>
  )
}