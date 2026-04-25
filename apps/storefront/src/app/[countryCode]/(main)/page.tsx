import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import UspBar from "@modules/home/components/usp-bar"
import FeaturedProducts from "@modules/home/components/featured-products"
import AboutStrip from "@modules/home/components/about-strip"
import MaterialsSection from "@modules/home/components/materials-section"
import Testimonials from "@modules/home/components/testimonials"
import BlogPreview from "@modules/home/components/blog-preview"
import CtaBanner from "@modules/home/components/cta-banner"

export const metadata: Metadata = {
  title: "WJ Houtbouw — Handcrafted Outdoor Furniture",
  description:
    "Premium picnic tables and outdoor furniture crafted from sustainably sourced European timber. Built to weather every season.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  return (
    <div className="bg-wj-bg">
      <Hero />
      <UspBar />
      <FeaturedProducts countryCode={countryCode} />
      <AboutStrip />
      <MaterialsSection />
      <Testimonials />
      <BlogPreview />
      <CtaBanner />
    </div>
  )
}
