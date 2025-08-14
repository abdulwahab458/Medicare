import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async (props: SearchParamProps) => {
  const resolvedSearchParams = await props.searchParams;


  const appointmentId = (resolvedSearchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);


  const doctor = Doctors.find((doc)=> doc.name === appointment.primaryPhysician)

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0f0f0f] px-6 text-white">
      <div className="bg-[#1a1a1a] shadow-2xl rounded-3xl p-10 max-w-xl w-full flex flex-col items-center text-center border border-[#2c2c2c]">
        {/* Header */}
        <Link href="/">
          <h1 className="text-4xl font-extrabold text-green-500 mb-4">MediCare</h1>
        </Link>

        {/* Success Animation */}
        <Image
          src="/success.gif"
          height={200}
          width={200}
          alt="success gif"
          className="mb-6"
        />

        {/* Confirmation Message */}
        <h2 className="text-2xl font-semibold mb-3 text-white">
          🎉 Your <span className="text-green-500">Appointment</span> is Booked!
        </h2>
        <p className="text-gray-400 mb-8">
          We’ll be in touch shortly to confirm your request.
        </p>

        {/* Appointment Details Card */}
        <div className="bg-[#2a2a2a] w-full rounded-xl p-6 border border-[#3a3a3a]">
          <p className="text-left text-gray-500 font-medium mb-3">Appointment Details</p>
          <div className="flex items-center gap-4">
            <Image
              src={doctor?.image!}
              width={50}
              height={50}
              alt="Doctor"
              className="rounded-full border border-gray-600"
            />
            <div className="text-left">
              <p className="font-semibold text-lg text-white">{doctor?.name}</p>
              <div className="mt-3 text-sm text-gray-400 flex ">
                <Image
                src='/icons/calendar.svg'
                height={23}
                width={23}
                alt='img'/>
                <p>{formatDateTime(appointment.schedule).dateTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link href="/" className="mt-8">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default page
