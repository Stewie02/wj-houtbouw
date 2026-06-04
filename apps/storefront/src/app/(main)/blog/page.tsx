import { Metadata } from "next";
import Image from "next/image";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { BLOG_POSTS } from "@lib/data/blog";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("nl-NL", { year: "numeric", month: "long" }).format(
    new Date(iso)
  );

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, inspiratie en verhalen vanuit de werkplaats van W&J Houtbouw.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-wj-bg">
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Blog
          </h1>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
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
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2">
                {post.category}
              </div>
              <h2 className="font-display font-semibold text-[18px] sm:text-[19px] text-wj-text leading-[1.4] mb-2.5 group-hover:text-wj-green transition-colors">
                {post.title}
              </h2>
              <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-3 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="font-body text-[13px] text-wj-muted">
                {formatDate(post.date)}
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  );
}
