import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandTag from "@modules/common/components/brand-tag";
import { getBlogPost } from "@lib/data/blog";
import { JsonLd } from "@modules/common/components/json-ld";
import { getBaseURL } from "@lib/util/env";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("nl-NL", { year: "numeric", month: "long" }).format(
    new Date(iso)
  );

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const base = getBaseURL();

  return (
    <div className="bg-wj-bg">
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          url: `${base}/blog/${post.slug}`,
          datePublished: post.date,
          ...(post.image ? { image: `${base}${post.image}` } : {}),
          publisher: {
            "@type": "Organization",
            "@id": `${base}/#organization`,
          },
        }}
      />
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <LocalizedClientLink
            href="/blog"
            className="font-body text-[13px] text-[rgba(254,252,249,0.6)] hover:text-wj-white transition-colors mb-4 block"
          >
            ← Terug naar blog
          </LocalizedClientLink>
          <div className="flex items-center gap-3 mb-4">
            <BrandTag variant="wood">{post.category}</BrandTag>
            <span className="font-body text-[13px] text-[rgba(254,252,249,0.6)]">
              {formatDate(post.date)}
            </span>
          </div>
          <h1 className="font-display font-bold text-[28px] sm:text-[40px] text-wj-white tracking-[-0.02em] max-w-[720px]">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        {post.image && (
          <div className="aspect-[16/9] mb-12 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-8">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-wj-text tracking-[-0.01em] mb-3">
                  {section.heading}
                </h2>
              )}
              <p className="font-body text-[15px] sm:text-[16px] text-wj-text leading-[1.75]">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
