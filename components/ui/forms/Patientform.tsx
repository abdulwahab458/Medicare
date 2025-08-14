"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "@/components/SubmitButton"
import { formSchema } from "@/lib/UserFormValidation"
import { createUser } from "@/lib/actions/patient.action"
import { Stethoscope } from "lucide-react"


export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  PHONE_INPUT = "phoneInput",
  SKELETON = "skeleton",
  EMAIL = "email",
  SELECT = "select"
}

export function Patientform() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // ✅ Keep this INSIDE the component
  async function onSubmit({ name, email, phone }: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const userdata = { name, email, phone }
      const user = await createUser(userdata)

      if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex'>
          <Stethoscope className="text-emerald-400 h-10 w-10" />
          <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Medicare
          </span>
        </div>
        <section className="mb-11 space-y-4">
          <h1 className="text-3xl">Whatsup</h1>
          <p className="text-gray-500">Schedule Your First Appointment</p>
        </section>

        <CustomForm
          name="name"
          label="Full Name"
          placeholder="Hank"
          iconSrc="/icons/user.svg"
          fieldtype={FormFieldType.INPUT}
          control={form.control}
          iconalt="user"
        />

        <CustomForm
          name="email"
          label="Email"
          placeholder="hank@gmail.com"
          iconSrc="/icons/email.svg"
          fieldtype={FormFieldType.INPUT}
          control={form.control}
          iconalt="email"
        />

        <CustomForm
          name="phone"
          label="Phone"
          placeholder="+55555555"
          fieldtype={FormFieldType.PHONE_INPUT}
          control={form.control}
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
