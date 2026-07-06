import React from 'react'
import './App.css'
import LocationHeader from './components/home/LocationHeader'
import HomeHeroSlider from './components/home/HomeHeroSlider'
import Whychooseus from './components/home/Whychooseus'
import Giftsforoccasion from './components/home/Giftsforoccasion'
import Sell from './components/home/sell'
import FeaturedProducts from './components/home/FeaturedProducts'
import Hamper from './components/home/hamper'
import CorporateGifting from './components/home/CorporateGifting'
import Testimonials from './components/home/Testimonials'
import Instagramfeed from './components/home/Instagramfeed'
import Footer from './components/home/footer'
import HeaderScroller from './components/home/HeaderScroller'
function App() {
  return (
    <>
    <HeaderScroller />
    <LocationHeader />
    <HomeHeroSlider />
    <Whychooseus />
    <Giftsforoccasion />
    <Sell />
    <FeaturedProducts />
    <Hamper />
    <CorporateGifting />
    <Testimonials />
    <Instagramfeed />
    <Footer />
  </>
  )
}

export default App