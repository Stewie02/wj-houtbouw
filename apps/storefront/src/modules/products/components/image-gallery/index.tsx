"use client";

import { useEffect, useRef, useState } from "react";
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
  const { state: lightboxOpen, open: openLightbox, close: closeLightbox } =
    useToggleState();
  const thumbs = images.length > 0 ? images.slice(0, 4) : Array(4).fill(null);

  // Both the inline image and the lightbox are native scroll-snap tracks (finger
  // drag + momentum + snap). onScroll keeps activeIndex in sync. The effect below
  // hands the active index between the two tracks when the lightbox opens/closes.
  const trackRef = useRef<HTMLDivElement>(null);
  const lightboxTrackRef = useRef<HTMLDivElement>(null);

  const snapTo = (track: HTMLDivElement | null, i: number, smooth = true) => {
    const n = (i + images.length) % images.length;
    track?.scrollTo({
      left: n * track.clientWidth,
      behavior: smooth ? "smooth" : "auto",
    });
  };
  const indexOf = (track: HTMLDivElement) =>
    Math.round(track.scrollLeft / track.clientWidth);

  // On open, jump the lightbox track to the current image; on close, hand the
  // (possibly swiped) index back to the inline track. Keyed on lightboxOpen only,
  // so swiping inside either track never fights this.
  // ponytail: useEffect (post-paint); switch to useLayoutEffect if a non-zero
  // open ever flashes image 0 for a frame.
  useEffect(() => {
    const track = lightboxOpen ? lightboxTrackRef.current : trackRef.current;
    if (track) track.scrollLeft = activeIndex * track.clientWidth;
  }, [lightboxOpen]);

  return (
    <div>
      {/* Main image — native scroll-snap carousel */}
      {images.length > 0 ? (
        <div
          ref={trackRef}
          onScroll={() =>
            trackRef.current && setActiveIndex(indexOf(trackRef.current))
          }
          className="flex overflow-x-auto snap-x snap-mandatory mb-3 border border-wj-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.id ?? i}
              type="button"
              onClick={() => openLightbox()}
              className="relative aspect-[3/2] w-full flex-none snap-center overflow-hidden group"
            >
              <Image
                src={img.url}
                alt={productTitle}
                fill
                className="object-cover"
                priority={i === 0}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute inset-0 bg-wj-dark/0 group-hover:bg-wj-dark/10 transition-colors" />
            </button>
          ))}
        </div>
      ) : (
        <div className="relative aspect-[3/2] w-full border border-wj-border overflow-hidden mb-3">
          <PlaceholderImage label="Main product shot" />
        </div>
      )}

      {/* Mobile position dots. ponytail: fine up to ~6 images, gets crowded beyond. */}
      {images.length > 1 && (
        <div className="flex md:hidden justify-center gap-1.5 mb-3">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                activeIndex === i ? "bg-wj-green" : "bg-wj-border"
              }`}
            />
          ))}
        </div>
      )}

      {images.length > 0 && (
        <Modal isOpen={lightboxOpen} close={closeLightbox} size="large">
          <Modal.Body>
            <div className="relative w-full">
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Sluiten"
                className="absolute -top-3 -right-3 z-10 rounded-full bg-wj-white border border-wj-border p-1.5 hover:bg-wj-surface"
              >
                <X size="16" />
              </button>

              <div
                ref={lightboxTrackRef}
                onScroll={() =>
                  lightboxTrackRef.current &&
                  setActiveIndex(indexOf(lightboxTrackRef.current))
                }
                className="flex overflow-x-auto snap-x snap-mandatory w-full aspect-[3/2] max-h-[75vh] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((img, i) => (
                  <div
                    key={img.id ?? i}
                    className="relative w-full flex-none snap-center"
                  >
                    <Image
                      src={img.url}
                      alt={productTitle}
                      fill
                      className="object-contain"
                      quality={90}
                      sizes="90vw"
                    />
                  </div>
                ))}
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => snapTo(lightboxTrackRef.current, activeIndex - 1)}
                    aria-label="Vorige afbeelding"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-wj-white/80 border border-wj-border p-2 hover:bg-wj-white"
                  >
                    <ChevronDown size="20" className="rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => snapTo(lightboxTrackRef.current, activeIndex + 1)}
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
            onClick={() => img && snapTo(trackRef.current, i)}
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
