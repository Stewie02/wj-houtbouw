import Hero from "@modules/home/components/hero";
import UspBar from "@modules/home/components/usp-bar";
import FeaturedProducts from "@modules/home/components/featured-products";
import AboutStrip from "@modules/home/components/about-strip";
import MaterialsSection from "@modules/home/components/materials-section";
import BlogPreview from "@modules/home/components/blog-preview";
import CtaBanner from "@modules/home/components/cta-banner";

export default async function Home() {
  return (
    <div className="bg-wj-bg">
      <Hero />
      <UspBar />
      <FeaturedProducts />
      <AboutStrip />
      <MaterialsSection />
      <BlogPreview />
      <CtaBanner />
    </div>
  );
}
