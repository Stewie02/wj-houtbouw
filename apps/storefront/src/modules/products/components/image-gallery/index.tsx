"use client";

import { useState } from "react";
import Image from "next/image";
import { HttpTypes } from "@medusajs/types";
import PlaceholderImage from "@modules/common/components/placeholder-image";
import Modal from "@modules/common/components/modal";
import useToggleState from "@lib/hooks/use-toggle-state";
import ChevronDown from "@modules/common/icons/chevron-down";
import X from "@modules/common/icons/x";

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[];
  productTitle: string;
};

const ImageGallery = ({ images, productTitle }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratio, setRatio] = useState("3 / 2");
  const { state: lightboxOpen, open: openLightbox, close: closeLightbox } =
    useToggleState();
  const thumbs = images.length > 0 ? images.slice(0, 4) : Array(4).fill(null);
  const activeImage = images[activeIndex] ?? null;

  const showPrev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div>
      {/* Main image */}
      <button
        type="button"
        onClick={() => activeImage?.url && openLightbox()}
        className="relative aspect-[3/2] w-full border border-wj-border overflow-hidden mb-3 group"
      >
        {activeImage?.url ? (
          <>
            <Image
              src={activeImage.url}
              alt={productTitle}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute inset-0 bg-wj-dark/0 group-hover:bg-wj-dark/10 transition-colors" />
          </>
        ) : (
          <PlaceholderImage label="Main product shot" />
        )}
      </button>

      {activeImage?.url && (
        <Modal isOpen={lightboxOpen} close={closeLightbox} size="large">
          <Modal.Body>
            <div
              className="relative w-full max-h-[75vh] mx-auto"
              style={{ aspectRatio: ratio, maxWidth: "85vw" }}
            >
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Sluiten"
                className="absolute -top-3 -right-3 z-10 rounded-full bg-wj-white border border-wj-border p-1.5 hover:bg-wj-surface"
              >
                <X size="16" />
              </button>
              <Image
                src={activeImage.url}
                alt={productTitle}
                fill
                className="object-contain"
                quality={90}
                sizes="90vw"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  setRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Vorige afbeelding"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-wj-white/80 border border-wj-border p-2 hover:bg-wj-white"
                  >
                    <ChevronDown size="20" className="rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Volgende afbeelding"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-wj-white/80 border border-wj-border p-2 hover:bg-wj-white"
                  >
                    <ChevronDown size="20" className="-rotate-90" />
                  </button>
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>
      )}

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
