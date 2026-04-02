import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import FeaturedArticles from '../components/FeaturedArticles'
import BlogGrid from '../components/BlogGrid'
import CtaSection from '../components/CtaSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <FeaturedArticles />
      <BlogGrid />
      <CtaSection />
      <Footer />
    </main>
  )
}
