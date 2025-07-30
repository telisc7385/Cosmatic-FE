import { ProductData } from "@/types/product";
import { apiCore } from "./ApiCore";

export async function getProducts({
  limit,
  page,
  newArrival,
  categories,
  subcategories,
  tags,
  min,
  max,
  sortOrder,
  search,
  category_slug
}: {
  limit: number;
  page: number;
  newArrival?: boolean;
  categories?: number[];
  subcategories?: number[];
  tags?: number[];
  min?: number;
  max?: number;
  sortOrder?: "price_asc" | "price_desc" | "";
  search?: string | null;
  category_slug? : string;
}): Promise<ProductData> {
  const params = new URLSearchParams();

  params.append("is_active", "true");
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (newArrival) params.append("newArrival", "true");
  if (search) params.append("search", search);
  if (category_slug) params.append("category_slug", category_slug);

  if (categories && categories.length > 0) {
    categories.forEach((cat) => params.append("category", String(cat)));
  }

  if (subcategories && subcategories.length > 0) {
    subcategories.forEach((sub) => params.append("subcategory", String(sub)));
  }

  if (tags && tags.length > 0) {
    params.append("tags", tags.join(","));
  }

  if (typeof min === "number") params.append("min", min.toString());
  if (typeof max === "number") params.append("max", max.toString());

  if (sortOrder === "price_asc") params.append("sort", "selling_price");
  else if (sortOrder === "price_desc") params.append("sort", "-selling_price");

  const url = `/product?${params.toString()}`;

  return await apiCore<ProductData>(url, "GET");
}
