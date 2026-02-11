import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

function Home() {
  return (
    <div className='min-h-screen overflow-hidden bg-white text-black'>
      <Navbar/>
      {/* top */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <div>
         <motion.div>

         </motion.div>
        </div>
        <dix>
          <p className='text-lg text-gray-700'>Your one-stop solution for all exam preparation needs. Access comprehensive notes, practice questions, and personalized study plans to ace your exams with confidence.</p>
        </dix>

      </section>

      {/* bottom */}
      <section>

      </section>
    </div>
  )
}

export default Home