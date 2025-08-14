
import { Registerform } from '@/components/ui/forms/Registerform'
import { getUser } from '@/lib/actions/patient.action'
import { Stethoscope } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = async (props: SearchParamProps) => {
  const { userId } = await props.params; 
  const user = await getUser(userId);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section - Form */}
      <section className="flex flex-col w-1/2 h-full">
        {/* Fixed Top Section */}
        <div className="px-8 py-5">
          <div className='flex items-center justify-center'>
            <Stethoscope className="text-emerald-400 h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Medicare
            </span>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-8 pb-10  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Registerform user={user} />

          <div className="flex w-full text-xl mt-20 items-center text-gray-600">
            <p>©2025 MediCare</p>

          </div>
        </div>
      </section>

      {/* Right Section - Image */}
      <div className="w-1/2 h-screen relative">
        <Image
          src="/register.jpg"
          alt="nurse"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}

export default page
