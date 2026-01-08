import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/Asset'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='text-2xl text-center pt-8 border-t' >
      <div>
        <Title text1 ={'ABOUT'} text2 = {'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16' >
        <img className='w-full md:max-w-[480px] ' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm text-start'>
            <p>At LoftyFashion, fashion is more than fabric—it's a statement of identity, confidence, and artistry. Founded with a passion for bold silhouettes and timeless elegance, we design pieces that empower the modern muse to express herself unapologetically. Every stitch tells a story, every cut is intentional, and every collection is a celebration of individuality. Our designs blend contemporary edge with classic sophistication, creating garments that transition effortlessly from runway to real life.</p>
            <p>We believe in fashion that speaks louder than words. Inspired by global cultures, urban landscapes, and the rhythm of everyday life, our creations are crafted for those who dare to stand out. Sustainability and craftsmanship are at the heart of our process, ensuring that each piece is not only beautiful but also responsibly made. Whether you're dressing for power, play, or presence, LoftyFashion is your canvas—where style meets soul.</p>
            <b className='text-gray-800'>OUR MISSION</b>
            <p>At LoftyFashion, our mission is to redefine fashion as a powerful form of self-expression. We create bold, sophisticated, and ethically crafted garments that inspire confidence and celebrate individuality. With every design, we aim to empower our community to embrace their unique style, challenge convention, and wear their story with pride. Through innovation, sustainability, and artistry, we are committed to shaping a future where fashion is inclusive, intentional, and unapologetically authentic.</p>
        </div>

      </div>
      <div className='text-xl py-4' >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col sm:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Quality Assurance :</b>
          <p className='text-gray-600'>We meticulously vet our product to meet our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Convenience :</b>
          <p className='text-gray-600'>With our user-friendly interface and our hassle-free ordering interface. Shopping has never been so easy. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'>Our team of dedicated professional is here to assist you all the way. Ensuring your satisfaction is our top priority</p>
        </div>

      </div>
      <NewsletterBox />
      
    </div>
  )
}

export default About
