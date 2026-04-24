import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Brands from "@/components/common/Brands2";

import Cookie from "@/components/modals/Cookie";


export const metadata = {
  title: "Cookies",
  description: "Learn about our use of cookies and how we protect your privacy. Our cookie policy explains what cookies are, how we use them, and your choices regarding their use. We are committed to ensuring that your personal information is secure and that you have control over your data. Read our cookie policy to understand how we enhance your browsing experience while safeguarding your privacy.",
};


export default function Home() {
  return (
    <>
      <Topbar1 />
      <Header1 />
      <Brands />
      <Footer1 />
      <Cookie />
    </>
  );
}
