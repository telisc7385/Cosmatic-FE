



"use client";
 
import { useState, useEffect } from "react";
import Image from "next/image";

import { Product, ProductVariant } from "@/types/product";
import Link from "next/link";
 
interface Props {
  product: Product;
}
 
const ProductCard = ({ product }: Props) => {
  const firstGeneralImage = product.images.find(
    (img) => img.sequence === 1
  )?.image;
  const secondGeneralImage = product.images.find(
    (img) => img.sequence === 2
  )?.image;
 
  const [hovered, setHovered] = useState(false);
  const [mainDisplayImage, setMainDisplayImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
 

  useEffect(() => {
    let initialImage = firstGeneralImage || "/placeholder.jpg";
    let initialVariant: ProductVariant | null = null;
 
    if (product.variants && product.variants.length > 0) {
      const defaultSelectedVariant = product.variants.find(
        (v) => v.is_selected
      );
      if (defaultSelectedVariant && defaultSelectedVariant.images.length > 0) {
        initialImage = defaultSelectedVariant.images[0].url;
        initialVariant = defaultSelectedVariant;
      } else if (product.variants[0].images.length > 0) {
        initialImage = product.variants[0].images[0].url;
        initialVariant = product.variants[0];
      }
    }
 
    setMainDisplayImage(initialImage);
    setSelectedVariant(initialVariant);
  }, [product, firstGeneralImage]);
 

 

 
  const currentMainImageSrc =
    selectedVariant && selectedVariant.images.length > 0
      ? mainDisplayImage
      : hovered && secondGeneralImage
      ? secondGeneralImage
      : firstGeneralImage || "/placeholder.jpg";
 
  return (
    <div
      className="relative group shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl p-3 overflow-hidden w-[220px] sm:w-[240px] mx-auto"
      style={{
        background: "linear-gradient(to bottom right, #dae6f1, #ffffff)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Wrap all clickable parts in Link */}
    
        <div>
     
          <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-white shadow-inner">
            <Image
              src={currentMainImageSrc}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
 
          {/* Product Name */}
          <h3 className="mt-2 text-center text-sm font-semibold text-rose-800 line-clamp-2">
            {product.name}
          </h3>
 
          {/* Price Section */}
          <div className="mt-1 flex justify-center items-center gap-2">
            <span className="font-bold text-base" style={{ color: "#213E5A" }}>
              ₹
              {selectedVariant
                ? selectedVariant.selling_price.toFixed(2)
                : parseFloat(product.sellingPrice).toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{parseFloat(product.basePrice).toFixed(2)}
            </span>
          </div>
        </div>

 
      {/* Select Variant Button - outside Link */}
      <div className="mt-2 flex justify-center">
          <Link href={`/product/${product.slug}`} className="block">
        <button
          type="button"
           className="text-white text-sm px-4 py-1.5 rounded-full transition cursor-pointer"
          style={{ backgroundColor: "#213E5A" }}
        >
          Select Variant
        </button>
        </Link>
      </div>
    </div>
  );
};
 
export default ProductCard;
 
 