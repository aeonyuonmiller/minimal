import React from 'react'
import Carousel from "../components/Carousel/Carousel"
import AnimatedH1 from '../hooks/AnimatedH1.js';

const page = () => {

  return (
    <div className='about'>
        <AnimatedH1>
          <h1>About</h1>
        </AnimatedH1>
        {/* <AnimatedH1>Hello World</AnimatedH1> */}
        <p>some things to know</p>
      
        <Carousel />
      </div>
  )
}

export default page