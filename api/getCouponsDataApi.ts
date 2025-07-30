import { apiCore, Coupon } from "@/api/ApiCore";


export async function getCouponData(token: string) {
  const response = await apiCore<{ success: boolean; data: Coupon[] }>(
    `/coupon/discounts?is_active=true`,
    "GET",
    {},
    token
  );
  return response;
}
