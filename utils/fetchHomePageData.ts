import { fetchCategories } from "@/api/fetchCategories";
import { getProducts } from "@/api/fetchFeaturedSlider";
import { fetchAllTag } from "@/api/fetchProductBySlug";
import { getTestimonials, getGallery } from "@/api/fetchWhyChooseUs";
import { getBanners } from "@/api/getBannerApi";

// lib/fetchHomePageData.ts
export async function fetchHomePageData() {
    const [
      banners,
      categoriesResponse,
      product,
      testimonials,
      gallery,
      tagData,
      newArrival,
    ] = await Promise.all([
      getBanners(),
      fetchCategories(),
      getProducts(6, 1),
      getTestimonials(),
      getGallery(),
      fetchAllTag(),
      getProducts(10, 1, true),
    ]);
  
    return {
      banners,
      categories: categoriesResponse.categories,
      product,
      testimonials,
      gallery,
      tagData,
      newArrival,
    };
  }
  