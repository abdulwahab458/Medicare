import { AppointmentForm } from '@/components/ui/forms/Appointmentform'
import { getPatient } from '@/lib/actions/patient.action'
import { Stethoscope } from 'lucide-react'
import Image from 'next/image'

const page = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <section className="flex items-center justify-center w-1/2 ">
        <div className="w-full max-w-2xl h-screen px-8 py-10 flex flex-col justify-center ">
          <div className='flex'>
            <Stethoscope className="text-emerald-400 h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Medicare
            </span>
          </div>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <div className="flex w-full text-xl mt-20 justify-between text-gray-600">
            <p>©2025 MediCare</p>

          </div>
        </div>
      </section>

      {/* Right Section - Image */}
      <div className="w-1/2 h-screen relative">
        <Image
          src="/doc.jpg"
          alt="nurse"
          fill
          className="object-cover ]"
          priority

        />
      </div>
    </div>
  )
}

export default page
