"use client"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/Patientform"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"

interface CustomProps {
  //@ts-ignore
  control: Control<any>,
  fieldtype: FormFieldType,
  name: string,
  label: string,
  placeholder?: string,
  iconSrc?: string,
  iconalt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  //@ts-ignore
  renderSkeleton?: (field: any) => React.ReactNode
}

// Common styles for wrappers and inputs
const inputWrapperStyles =
  "flex items-center rounded-md border border-gray-500 bg-black text-white w-full h-10 px-3"

const inputBaseStyles =
  "bg-transparent text-white w-full focus:outline-none placeholder:text-gray-400"
//@ts-ignore
const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
  const {
    fieldtype,
    placeholder,
    iconSrc,
    iconalt,
    renderSkeleton,
    dateFormat,
    showTimeSelect
  } = props;

  switch (fieldtype) {
    case FormFieldType.INPUT:
      return (
        <div className={inputWrapperStyles}>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={20}
              width={20}
              alt={iconalt || 'icon'}
              className="mr-2"
            />
          )}
          <FormControl className="flex-1">
            <input
              placeholder={placeholder}
              className={inputBaseStyles}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
        </div>
      )

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <div className={inputWrapperStyles}>
            <PhoneInput
              international
              defaultCountry="US"
              withCountryCallingCode
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
              className={`${inputBaseStyles} [&>input]:bg-transparent [&>input]:text-white`}
              countrySelectProps={{
                className: "bg-black text-white"
              }}
            />
          </div>
        </FormControl>
      )

    case FormFieldType.DATE_PICKER:
      return (
        <div className={inputWrapperStyles}>
          <Image
            src='/icons/calendar.svg'
            width={20}
            height={20}
            alt="calendar"
            className="mr-2"
          />
          <FormControl className="flex-1">
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              placeholderText={placeholder}
              dateFormat={dateFormat || "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect}
              className={inputBaseStyles}
              wrapperClassName="w-full"
            />
          </FormControl>
        </div>
      )

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="mt-3 h-12 w-full  bg-black text-white border border-gray-500 rounded-md px-3 focus:outline-none" >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-black text-white border border-gray-600 rounded-md shadow-lg z-50">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            {...field}
            value={field.value ?? ""}
            placeholder={placeholder}
            disabled={props.disabled}
          />
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors duration-150">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-blue-600 border-gray-600"
            />
            <label
              htmlFor={props.name}
              className="text-sm text-gray-200 select-none cursor-pointer"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      )
    default:
      return null;
  }
}

const CustomForm = (props: CustomProps) => {
  const { control, fieldtype, name, label } = props;

  return (
    <div className="w-full">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldtype !== FormFieldType.CHECKBOX && label && (
              <FormLabel className="text-white">{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default CustomForm
