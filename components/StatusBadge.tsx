import { StatusIcon } from '@/constants'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const StatusBadge = ({status}:{status:Status}) => {
  return (
    <div className={clsx('flex gap-2 h-5 items-center w-32 justify-center  rounded-3xl p-3 ',{
        'bg-green-600/40':status === 'scheduled',
        'bg-blue-600/40':status === 'pending',
        'bg-red-600/40':status === 'cancelled',
    })}>
        <Image
        src={StatusIcon[status]}
        alt='status'
        width={24}
        height={24}
        className='w-4 h-4 '/>
        <p className='capitalize'>{status}</p>
    </div>
  )
}

export default StatusBadge
