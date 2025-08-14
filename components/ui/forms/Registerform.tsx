
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Form, FormControl } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "@/components/SubmitButton"
import {  PatientFormValidation } from "@/lib/UserFormValidation"
import {  registerPatient } from "@/lib/actions/patient.action"
import { FormFieldType } from "./Patientform"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Doctors, Genders, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "@/components/ui/label"

import { SelectItem } from "@/components/ui/select"
import Image from "next/image"
import FileUploader from "@/components/FileUploader"


interface RegisterProps {
  user: User
}

export function Registerform({ user }: RegisterProps) {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    // @ts-ignore
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })


  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    console.log("form submitted");
    setIsLoading(true)
    let formdata;
    if(values.identificationDocument&&values.identificationDocument.length>0){
      const blobFile = new Blob([values.identificationDocument[0]],{
        type:values.identificationDocument[0].type,
      });

      formdata = new FormData();
      formdata.append('blobFile',blobFile);
      formdata.append('fileName',values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId:user.$id,
        birthDate:new Date(values.birthDate),
        identificationDocument:formdata

      }
      // @ts-ignore
      const patient = await registerPatient(patientData);
      if(patient)router.push(`/patients/${user.$id}/new-appointment`)
     
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-11 space-y-4">
          <h1 className="text-3xl">Welcome</h1>
          <p className="text-gray-500">Let us know more about you </p>
        </section>
        <section className="mb-11 space-y-5">
          <h2 className=" text-3xl">Personal Information</h2>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomForm
            name="birthDate"
            label="Date of Birth"
            fieldtype={FormFieldType.DATE_PICKER}
            control={form.control}

          />

          <CustomForm
            name="gender"
            label="Gender"
            fieldtype={FormFieldType.SKELETON}
            control={form.control}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 lg:justify-between"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {Genders.map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem
                        id={opt}
                        value={opt}
                        className="w-4 h-4 rounded-full border border-white data-[state=checked]:bg-white"
                      />
                      <Label htmlFor={opt} className="cursor-pointer text-white">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomForm
            name="address"
            label="Address"
            placeholder="Street Address: 17, National Library Avenue"
            fieldtype={FormFieldType.INPUT}
            control={form.control}

          />
          <CustomForm
            name="occupation"
            label="Occupation"
            placeholder="Engineer"
            fieldtype={FormFieldType.INPUT}
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomForm
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardians Name"
            fieldtype={FormFieldType.INPUT}
            control={form.control}
          />

          <CustomForm
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="+55555555"
            fieldtype={FormFieldType.PHONE_INPUT}
            control={form.control}
          />
        </div>

        <section className="mb-11 space-y-5">
          <h2 className=" text-3xl">Medical Information</h2>
        </section>

        <CustomForm
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a Physician"
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

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomForm
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Jeevan Anand"
            fieldtype={FormFieldType.INPUT}
            control={form.control}
          />
          <CustomForm
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="HLMNH7897089"
            fieldtype={FormFieldType.INPUT}
            control={form.control}
          />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomForm
            name="allergies"
            label="Allergies(if any)"
            placeholder="pollen, peanuts,etc..."
            fieldtype={FormFieldType.TEXTAREA}
            control={form.control}
          />
          <CustomForm
            name="currentMedication"
            label="Current Medication"
            placeholder="amoxicillin, aspirin, etc..."
            fieldtype={FormFieldType.TEXTAREA}
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-5 xl:flex-row">
          <CustomForm
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Mother had diabetes, Father had lung cancer"
            fieldtype={FormFieldType.TEXTAREA}
            control={form.control}
          />
          <CustomForm
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="amoxicillin, aspirin, etc..."
            fieldtype={FormFieldType.TEXTAREA}
            control={form.control}
          />
        </div>

        <section className="mb-11 space-y-5">
          <h2 className=" text-3xl">Identification and Verification</h2>
        </section>

        <CustomForm
          name="identificationType"
          label="Identification Type"
          placeholder="Select Your Identification type"
          fieldtype={FormFieldType.SELECT}
          control={form.control}
        >
          {
            IdentificationTypes.map((id) => (
              <SelectItem key={id} value={id} >
                <div className="flex  items-center cursor-pointer gap-3">

                  <p>{id}</p>
                </div>
              </SelectItem>

            ))
          }
        </CustomForm>

        <CustomForm
          name="identificationNumber"
          label="Identification Number "
          placeholder="ex. 9879382BHSH"
          fieldtype={FormFieldType.INPUT}
          control={form.control}

        />

        <CustomForm
          name="identificationDocument"
          label="Identification Document"
          fieldtype={FormFieldType.SKELETON}
          control={form.control}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value}
                onchange={field.onChange} 
              />
            </FormControl>
          )}
        />

        <section className="mb-11 space-y-5">
          <h2 className=" text-3xl">Consent and Privacy </h2>
        </section>

        <CustomForm
          control={form.control}
          fieldtype={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <CustomForm
          control={form.control}
          fieldtype={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="I consent to disclosure to of information"
        />
        <CustomForm
          control={form.control}
          fieldtype={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="I agree to the privacy policy"
        />



        <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
      </form>
    </Form>
  )
}
