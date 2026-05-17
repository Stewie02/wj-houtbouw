"use client";

import { useState } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import PlaceholderImage from "@modules/common/components/placeholder-image";
import BrandTag from "@modules/common/components/brand-tag";

type ProductCardProps = {
  name: string;
  price: string;
  material?: string;
  tag?: string;
  href: string;
};

const ProductCard = ({
  name,
  price,
  material,
  tag,
  href,
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
            <PlaceholderImage label={name} />
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
            <div className="font-body font-semibold text-[20px] text-wj-green">
              {price}
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
