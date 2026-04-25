import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandButton from "@modules/common/components/brand-button"
import PlaceholderImage from "@modules/common/components/placeholder-image"

const POSTS = [
  {
    title: "How to protect your outdoor table through winter",
    category: "Care & Maintenance",
    date: "March 2025",
  },
  {
    title: "Douglas fir vs. European oak: which wood is right for you?",
    category: "Wood Guide",
    date: "February 2025",
  },
  {
    title: "Our workshop: from raw timber to finished table",
    category: "Behind the Scenes",
    date: "January 2025",
  },
]

const BlogPreview = () => {
  return (
    <div className="py-20 sm:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2.5">
              From the workshop
            </div>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] text-wj-text tracking-[-0.02em]">
              Latest from the journal
            </h2>
          </div>
          <LocalizedClientLink href="/blog">
            <BrandButton variant="outline" className="shrink-0">
              All articles
            </BrandButton>
          </LocalizedClientLink>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <LocalizedClientLink key={post.title} href="/blog" className="block group cursor-pointer">
              <div className="aspect-[16/9] mb-5 overflow-hidden">
                <PlaceholderImage label={`blog — ${post.title}`} />
              </div>
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2">
                {post.category}
              </div>
              <h3 className="font-display font-semibold text-[18px] sm:text-[19px] text-wj-text leading-[1.4] mb-2.5 group-hover:text-wj-green transition-colors">
                {post.title}
              </h3>
              <div className="font-body text-[13px] text-wj-muted">{post.date}</div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
