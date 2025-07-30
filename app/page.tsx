// app/page.tsx
import CategorySection from "@/components/CategorySection/CategorySection";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import FeaturedSliderComponent from "@/components/ServersideComponent/FeaturedSliderComponent/FeaturedSliderComponent";
import GalleryPage from "@/components/ServersideComponent/GalleryPage/GalleryPage";
import HotListWrapper from "@/components/HotList/HotListWrapper";
import NewsletterSignup from "@/components/ClientsideComponent/NewsletterSignup/NewsletterSignup";

import TopCategoriesClient from "@/components/ClientsideComponent/TopCategoriesClient/TopCategoriesClient";
// import PromotionBanner from "@/components/ClientsideComponent/PromotionBanner/PromotionBanner";

import Counter from "@/components/ClientsideComponent/Counter/counter";
import PromotionBanner from "@/components/ClientsideComponent/PromotionBanner/PromotionBanner";
import { fetchHomePageData } from "@/utils/fetchHomePageData";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const {
    banners,
    categories,
    product,
    testimonials,
    gallery,
    tagData,
    newArrival,
  } = await fetchHomePageData();
  

  return (
    <div className="bg-white">
      <HeroBanner banners={banners} />
      <CategorySection categories={categories} />
      <Counter />
      <TopCategoriesClient categories={categories} type={"category"} />
      <FeaturesBanner />
      <HotListWrapper newArrival={newArrival} />
      <FeaturedSliderComponent product={product?.products} />
      <TopCategoriesClient categories={tagData} type={"tag"} />
      {/* <TagProductFilter /> */}
      <TestimonialsSection testimonials={testimonials} />
      <GalleryPage gallery={gallery} />
      <NewsletterSignup />

      <PromotionBanner />
    </div>
  );
}
