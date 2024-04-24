import Courses from "@/components/home-page/courses";
import FAQ from "@/components/home-page/faq";
import Features from "@/components/home-page/features";
import Hero from "@/components/home-page/hero";
import { getAllFAQs } from "@/lib/fetch-data";
import { NextPage } from "next";
import { IFaq } from "./admin/faq/page";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Heading from "@/components/heading";
import { pageConstants } from "@/constants";
import ChatBotClient from "@/components/layout/chatbot-client";
import { IBreadCrumb } from "@/types"; // Importing IBreadCrumb from the correct path
import BreadCrumbsComp from "@/components/layout/breadcrumbs"

interface Props { }
// SEO
// export const generateMetadata = () => {
//   return {
//     title: "Stock E-Learning",
//     description: pageConstants.siteDescription,
//     alternates: {
//       canonical: process.env.NEXT_PUBLIC_BASE_URL,
//     },
//   };
// };

const page: NextPage<Props> = async () => {
  const faqs = (await getAllFAQs()) as IFaq[];
  return (
    <>
      <Heading
        title="Stock E-Learning"
      />
      <Header />
      <div className="min-h-screen">
        <Hero />
        <div className="chatbot-container">
          <ChatBotClient />
        </div>
        <Courses />
        <Features />
        {/* <Reviews /> */}
        <FAQ faqs={faqs} />
      </div>
      <Footer />
    </>
  );
};

export default page;
