import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import FeaturedArticles from '../components/FeaturedArticles'
import BlogGrid from '../components/BlogGrid'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Ticker />
      <FeaturedArticles />
      <BlogGrid />
      <Footer />
    </main>
  )
}
