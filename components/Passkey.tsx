"use client"
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { decryptKey, encryptKey } from '@/lib/utils'

const Passkey = () => {
    const router = useRouter();
    const path = usePathname();
    const [open, setopen] = useState(true)
    const [passkey, setpasskey] = useState('')
    const [error, seterror] = useState('')


    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey)
        if (path) {
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setopen(false)
                router.push('/admin')
            } else {
                setopen(true)
            }
        }


    }, [encryptedKey])

    const closeModel = () => {
        setopen(false)
        router.push('/Home')

    }

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem('accessKey', encryptedKey);
            setopen(false)
        } else {
            seterror('Invalid Passkey, Please Try Again');
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setopen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>Admin Acesses Verification
                        <Image
                            src='/icons/close.svg'
                            width={20}
                            height={20}
                            alt='close icon'
                            onClick={() => closeModel()} />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        For Admin Access Enter the Admin Passkey
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='mx-auto'>
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={passkey} onChange={(e) => setpasskey(e)}
                        className='flex justify-center gap-3'>
                        <InputOTPGroup className='flex gap-3'>
                            <InputOTPSlot index={0} className="w-14 h-16 text-2xl text-center" />
                            <InputOTPSlot index={1} className="w-14 h-16 text-2xl text-center" />
                            <InputOTPSlot index={2} className="w-14 h-16 text-2xl text-center" />
                            <InputOTPSlot index={3} className="w-14 h-16 text-2xl text-center" />
                            <InputOTPSlot index={4} className="w-14 h-16 text-2xl text-center" />
                            <InputOTPSlot index={5} className="w-14 h-16 text-2xl text-center" />
                        </InputOTPGroup>
                    </InputOTP>
                    {error && <p className='text-xs mt-4 text-red-500 flex justify-center'>
                        {error}</p>}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction
                        className='w-full bg-green-500 mt-5 text-white'
                        onClick={(e) => validatePasskey(e)}
                    >
                        Enter Admin passkey</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Passkey
