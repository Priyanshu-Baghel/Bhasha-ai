import React from 'react';
import Features from '../../Components/Landing/Features';
import Pricing from '../../Components/Landing/Pricing';
import Testimonial from '../../Components/Landing/Testimonial';
import Faqs from '../../Components/Landing/Faqs';
import Hero from '../../Components/Landing/Hero';

const Landing = () => {
  return (
    <>
        <Hero />
        <Features />
        <Faqs />
        <Pricing />
        <Testimonial />
    </>
  )
}

export default Landing