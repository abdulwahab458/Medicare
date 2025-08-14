import React, { ReactNode } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
interface Buttonprops{
    isLoading:boolean,
    className?:string,
    children:ReactNode
}

const SubmitButton = ({isLoading,className,children}:Buttonprops) => {
  return (
    <div>
      <Button type='submit' disabled={isLoading} className={className??
        'bg-green-500 text-white hover:bg-gray-800'}>
            {isLoading ? (
          <div className='flex items-center gap-3'>
            <Image
            src='/icons/loader.svg'
            width='24'
            height='24'
            className='animate-spin'
            alt='loading....'/>
          </div>
        ) : (
          children
        )}
        </Button>
    </div>
  )
}

export default SubmitButton
