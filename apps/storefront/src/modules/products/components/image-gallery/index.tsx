"use client";

import { useState } from "react";
import Image from "next/image";
import { HttpTypes } from "@medusajs/types";
import PlaceholderImage from "@modules/common/components/placeholder-image";

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[];
  productTitle: string;
};

const ImageGallery = ({ images, productTitle }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbs = images.length > 0 ? images.slice(0, 4) : Array(4).fill(null);
  const activeImage = images[activeIndex] ?? null;

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[3/2] border border-wj-border overflow-hidden mb-3">
        {activeImage?.url ? (
          <Image
            src={activeImage.url}
            alt={productTitle}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <PlaceholderImage label="Main product shot" />
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {thumbs.map((img, i) => (
          <button
            key={i}
            onClick={() => img && setActiveIndex(i)}
            className={`relative aspect-[3/2] overflow-hidden border-2 transition-colors ${
              activeIndex === i
                ? "border-wj-green"
                : "border-wj-border hover:border-wj-muted"
            }`}
          >
            {img?.url ? (
              <Image
                src={img.url}
                alt={`${productTitle}, afbeelding ${i + 1}`}
                fill
                className="object-cover"
                quality={70}
                sizes="120px"
              />
            ) : (
              <PlaceholderImage label={`View ${i + 1}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
