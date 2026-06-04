import Image from "next/image";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";
import { BLOG_POSTS } from "@lib/data/blog";

const BlogPreview = () => {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <div className="py-20 sm:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2.5">
              Uit de werkplaats
            </div>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] text-wj-text tracking-[-0.02em]">
              Laatste van het blog
            </h2>
          </div>
          <LocalizedClientLink href="/blog">
            <BrandButton variant="outline" className="shrink-0">
              Alle artikelen
            </BrandButton>
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <LocalizedClientLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group cursor-pointer"
            >
              {post.image && (
                <div className="aspect-[16/9] mb-5 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={640}
                    height={360}
                    quality={75}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2">
                {post.category}
              </div>
              <h3 className="font-display font-semibold text-[18px] sm:text-[19px] text-wj-text leading-[1.4] mb-2.5 group-hover:text-wj-green transition-colors">
                {post.title}
              </h3>
              <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-2.5 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="font-body text-[13px] text-wj-muted">
                {post.date}
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
