import Statcard from '@/components/Statcard'
import {columns} from '@/components/table/columns'
import {DataTable} from '@/components/table/DataTable'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Link from 'next/link'
import React from 'react'



const page = async() => {
    const appoitments = await getRecentAppointmentList();
    return (
        <div className='mx-auto flex max-w-7xl   flex-col space-y-15 bg'>
            <header className="flex justify-between px-5 items-center bg-[#1a1818]  mx-auto text-white py-2  rounded-lg shadow-lg w-[1000px]">
                <Link href="/Home">
                    <h1 className="text-xl font-bold hover:text-gray-300 transition-colors">
                        MediCare
                    </h1>
                </Link>
                <p className="text-lg font-medium">Admin Dashboard</p>
            </header>

            <main className='flex flex-col w-[1000px] mx-auto space-y-5'>
                <section className='space-y-3'>
                    <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400' >Hello Admin! Welcome Back,</h1>
                    <p className='text-gray-500'>Start Your Day with managing Your new appointments</p>
                </section>

                <section className='flex w-[1000px] mx-auto  justify-between'>
                    <Statcard
                    type = "appointments"
                    count = {appoitments.scheduledCount}
                    label = "Scheduled appoitment"
                    icon="/icons/appointments.svg"/>

                    <Statcard
                    type = "pending"
                    count = {appoitments.pendingCount}
                    label = "pending appoitment"
                    icon="/icons/pending.svg"/>

                    <Statcard
                    type = "cancelled"
                    count = {appoitments.cancelledCount}
                    label = "cancelled appoitment"
                    icon="/icons/cancelled.svg"/>
                    
                </section>
                <DataTable columns={columns} data={appoitments.documents}/>
            </main>

        </div>
    )
}

export default page
