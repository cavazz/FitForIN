import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'
import CategoriaPage from './pages/CategoriaPage'
import SimpleInfoPage from './pages/SimpleInfoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CookieBanner />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/articolo/:slug" element={<ArticlePage />} />
        <Route path="/categoria/:cat" element={<CategoriaPage />} />
        <Route path="/contatti"       element={<SimpleInfoPage type="contatti" />} />
        <Route path="/privacy"        element={<SimpleInfoPage type="privacy" />} />
        <Route path="/cookie"         element={<SimpleInfoPage type="cookie" />} />
      </Routes>
    </BrowserRouter>
  )
}
