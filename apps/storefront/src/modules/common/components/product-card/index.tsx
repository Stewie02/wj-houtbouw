"use client";

import { useState } from "react";
import Image from "next/image";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import PlaceholderImage from "@modules/common/components/placeholder-image";
import BrandTag from "@modules/common/components/brand-tag";

type ProductCardProps = {
  name: string;
  price: string;
  originalPrice?: string;
  material?: string;
  tag?: string;
  href: string;
  thumbnail?: string | null;
};

const ProductCard = ({
  name,
  price,
  originalPrice,
  material,
  tag,
  href,
  thumbnail,
}: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <LocalizedClientLink href={href}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer bg-wj-white border border-wj-border overflow-hidden transition-shadow duration-200"
        style={{
          boxShadow: hovered
            ? "0 8px 32px rgba(26,20,16,0.12)"
            : "0 2px 8px rgba(26,20,16,0.05)",
        }}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <div
            className="w-full h-full transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          >
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <PlaceholderImage label={name} />
            )}
          </div>
          {tag && (
            <div className="absolute top-3 left-3">
              <BrandTag>{tag}</BrandTag>
            </div>
          )}
        </div>
        <div className="px-[22px] pt-5 pb-[22px]">
          {material && (
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1.5">
              {material}
            </div>
          )}
          <div className="font-display font-semibold text-[18px] text-wj-text mb-2">
            {name}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <div className="font-body font-semibold text-[20px] text-wj-green">
                {price}
              </div>
              {originalPrice && (
                <div className="font-body font-medium text-[14px] text-wj-muted line-through">
                  {originalPrice}
                </div>
              )}
            </div>
            <div
              className="font-body font-medium text-[12px] text-wj-muted transition-opacity duration-[180ms]"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              Product bekijken →
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
};

export default ProductCard;
