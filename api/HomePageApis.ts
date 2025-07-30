import { Testimonial } from "@/components/TestimonialsSection/TestimonialSlider";
import { apiCore } from "./ApiCore";
import { WhyChooseUsItem } from "@/types/whyChooseUs";
import { GalleryImage } from "@/types/gallery";
import { BannerType } from "@/types/banner";

export async function getWhyChooseUs(): Promise<WhyChooseUsItem[]> {
  try {
    const data = await apiCore<{ items?: WhyChooseUsItem[] }>(
      "/why-choose-us?is_active=true",
      "GET"
    );
    return data.items ?? [];
  } catch (error) {
    console.error("Error fetching Why Choose Us data:", error);
    return [];
  }
}


export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await apiCore<{ testimonials?: Testimonial[] }>(
      "/frontend/testimonial?is_active=true",
      "GET"
    );
    return data.testimonials ?? [];
  } catch (error) {
    console.error("Error fetching Why Choose Us data:", error);
    return [];
  }
}


export async function getGallery(): Promise< GalleryImage[]> {
  try {
    const data = await apiCore<{ result?:  GalleryImage[] }>(
      "/gallery?is_active=true",
      "GET"
    );
    return data.result ?? [];
  } catch (error) {
    console.error("Error fetching Why Choose Us data:", error);
    return [];
  }
}

export interface HomepageStat {
  id: number;
  title: string;
  number: number;
  is_active: boolean;
}

export const fetchHomepageStats = async (): Promise<HomepageStat[]> => {
  const res = await apiCore<{ results: HomepageStat[] }>("/homepage_statistics?is_active=true", "GET");
  return res.results;
};


export const getBanners = async (): Promise<BannerType[]> => {
  try {
    // Tell TypeScript what the shape of the response is
    const res = await apiCore<{ data: BannerType[] }>("/banners?isActive=true", "GET");

    // If the response is directly an array (fallback), return that; otherwise return res.data
    return Array.isArray(res) ? res : res.data || [];
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("API error 404")) {
      console.warn("Banner endpoint not found, fallback to empty array");
      return [];
    }

    return [];
  }
};