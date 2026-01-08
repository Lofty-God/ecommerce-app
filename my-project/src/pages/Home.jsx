import React from 'react'
import Heros from '../components/Heros'
import LatestCollections from '../components/LatestCollections'
import Bestsellers from '../components/Bestsellers'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Heros/>
      <LatestCollections/>
      <Bestsellers/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
