
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "@/components/SubmitButton"
import { getAppointmentSchema } from "@/lib/UserFormValidation"
import { FormFieldType } from "./Patientform"
import { Doctors } from "@/constants"
import { SelectItem } from "@/components/ui/select"
import Image from "next/image"
import { CreateAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/apwrite.types"

interface Appointmentformparams {
  userId: string,
  patientId: string,
  type: "create" | "cancel" | "schedule",
  appointment?: Appointment,
  setopen?: (open: boolean) => void
}

export function AppointmentForm({ type, userId, patientId, appointment, setopen }: Appointmentformparams) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const AppointmentFormValidation = getAppointmentSchema(type) as any;
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?appointment.primaryPhysician:'',
      schedule: appointment?new Date(appointment?.schedule): new Date(Date.now()),
      reason: appointment?appointment.reason:'',
      note: appointment?.note ||'',
      cancellationReason: appointment?.cancellationReason ||'',

    },
  })

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    console.log(values)
    setIsLoading(true)
    let status;
    switch (type) {
      case 'schedule':
        status = 'scheduled';
        break;
      case 'cancel':
        status = 'cancelled';
        break;

      default:
        status = 'pending';
        break;
    }
    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        }
        const appointment = await CreateAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
        }
      } else {
        const appoitmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type
        }
        const updatedAppointment = await updateAppointment(appoitmentToUpdate);
        if (updatedAppointment) {
          setopen && setopen(false);
          form.reset();
        }
      }


    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment"
      break;
    case "create":
      buttonLabel = "Create  Appointment"
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment"
      break;

    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type === 'create' && <section className="mb-11 space-y-4">
          <h1 className="text-3xl">New Appointments </h1>
          <p className="text-gray-500">Schedule Your First Appointment in just few seconds</p>
        </section>
        }

        {
          type !== "cancel" && (
            <>
              <CustomForm
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a Doctor"
                fieldtype={FormFieldType.SELECT}
                control={form.control}
              >
                {
                  Doctors.map((doctor) => (
                    <SelectItem key={doctor.name} value={doctor.name} >
                      <div className="flex  items-center cursor-pointer gap-3">
                        <Image
                          src={doctor.image}
                          height={24}
                          width={24}
                          alt={doctor.name}
                          className="rounded-full border border-black" />
                        <p>{doctor.name}</p>
                      </div>
                    </SelectItem>

                  ))
                }
              </CustomForm>
              <CustomForm
                fieldtype={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected Appointment Date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - h:mm aa" />

              <div className="flex flex-col gap-6 lg:flex-row">
                <CustomForm
                  name="reason"
                  label="Reason For Appointment"
                  placeholder="Enter A Reason for Appointment"
                  fieldtype={FormFieldType.TEXTAREA}
                  control={form.control}
                />
                <CustomForm
                  name="note"
                  label="Notes"
                  placeholder="Enter Notes"
                  fieldtype={FormFieldType.TEXTAREA}
                  control={form.control}
                />
              </div>
            </>
          )
        }
        {
          type === "cancel" && (
            <>
              <CustomForm
                name="cancellationReason"
                label="Reason For Cancellation"
                placeholder="Enter a reason for cancellation"
                fieldtype={FormFieldType.TEXTAREA}
                control={form.control}
              />
            </>
          )
        }


        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "bg-red-500" : "bg-green-600 text-white"} w-full`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}

