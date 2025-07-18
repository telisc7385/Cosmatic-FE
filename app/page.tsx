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

import { getBanners } from "@/api/getBannerApi";
import { fetchCategories } from "@/api/fetchCategories";
import {
  getGallery,
  getTestimonials,
  getWhyChooseUs,
} from "@/api/fetchWhyChooseUs";
import { getProducts } from "@/api/fetchFeaturedSlider";
import Counter from "@/components/ClientsideComponent/Counter/counter";
import { fetchAllTag } from "@/api/fetchProductBySlug";
import PromotionBanner from "@/components/ClientsideComponent/PromotionBanner/PromotionBanner";

export default async function HomePage() {
  const [banners, categoriesResponse, product, testimonials, gallery, tagData] =
    await Promise.all([
      getBanners(),
      fetchCategories(),
      // getWhyChooseUs(),
      getProducts(),
      getTestimonials(),
      getGallery(),
      fetchAllTag()
    ]);

  const { categories } = categoriesResponse;

  return (
    <div className="bg-white">
      <HeroBanner banners={banners} />
      <CategorySection categories={categories} />
      <Counter />
      <TopCategoriesClient categories={categories} type={"category"} />
      <FeaturesBanner />
      <HotListWrapper />
      <FeaturedSliderComponent product={product} />
      <TopCategoriesClient categories={tagData} type={"tag"} />
      {/* <TagProductFilter /> */}
      <TestimonialsSection testimonials={testimonials} />
      <GalleryPage gallery={gallery} />
      <NewsletterSignup />

      <PromotionBanner />
    </div>
  );
}
