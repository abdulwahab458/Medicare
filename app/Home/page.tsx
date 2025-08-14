import Passkey from '@/components/Passkey'
import { Patientform } from '@/components/ui/forms/Patientform'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = ({searchParams}: SearchParamProps) => {
  const isAdmin = searchParams.admin === 'true';
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {
        isAdmin && (
          <Passkey/>
        )
      }
      
      {/* Left Section - Form */}
      <section className="flex items-center justify-center w-full lg:w-1/2">
        <div className="w-full max-w-2xl h-screen lg:h-auto px-8 py-10 flex flex-col justify-center">
          <Patientform/>

          <div className="flex w-full text-xl mt-20 justify-between text-gray-600">
            <p>©2025 MediCare</p>
            <Link href="/Home/?admin=true" className="uppercase text-green-500 hover:underline">
              admin
            </Link>
          </div>
        </div>
      </section>

      {/* Right Section - Image (hidden on mobile) */}
      <div className="hidden lg:block w-1/2 h-screen relative">
        <Image
          src="/nurse.jpg"
          alt="nurse"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}

export default Page
