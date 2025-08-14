"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { AppointmentForm } from './ui/forms/Appointmentform'
import { Appointment } from '@/types/apwrite.types'

const AppointmentModal = ({ 
    type,patientId,userId,appointment }: {
    type: 'schedule' | 'cancel',
    patientId:string,
    userId:string,
    appointment:Appointment
}) => {
    const [open, setopen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={`capitalize ${type === 'schedule' ? 'text-green-500' : ''}`}
                >
                    {type}

                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader className='mb-4 space-y-3'>
                    <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Fill in the Details to {type} Appointment
                    </DialogDescription>
                </DialogHeader>
                <AppointmentForm
                userId={userId}
                patientId={patientId}
                type={type}
                appointment={appointment}
                setopen={setopen}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModal
