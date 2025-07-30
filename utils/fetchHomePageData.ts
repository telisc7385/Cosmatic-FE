import { getCompanySettings } from "@/api/CompanyApi";
import { fetchCategories } from "@/api/fetchCategories";
import { getProducts } from "@/api/fetchProductsList";
import { fetchAllTag } from "@/api/fetchProductBySlug";
import { getTestimonials, getGallery, getBanners } from "@/api/HomePageApis";

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
      getProducts({ limit: 6, page: 1 }),
      getTestimonials(),
      getGallery(),
      fetchAllTag(),
      getProducts({ limit: 10, page: 1, newArrival: true }),
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
  

  export async function fetchLayoutPageData() {
    const [
      topCategories,
      companySettingsRes,
    ] = await Promise.all([
      fetchCategories(),
      getCompanySettings(),
    ]);
  
    return {
      topCategories,
      companyDetails: companySettingsRes?.result?.[0]
    };
  }
  