"use client"


import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'

interface FileUploaderprops{
    files:File[] | undefined,
    onchange:(files:File[])=>void
}

const FileUploader = ({files,onchange}:FileUploaderprops)=> {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    onchange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="text-sm flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-600 bg-zinc-900 hover:bg-zinc-800 transition-colors p-6 text-gray-200">
      <input {...getInputProps()} />
     {
        files&& files?.length>0?(
            <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="image"
            className='object-cover overflow-hidden max-h-[400px]'/>
        ):(
            <>
            <Image
            src='/icons/upload.svg'
            height={50}
            width={50}
            alt='image'/>
            <p>Upload Your Document Here</p>
            <p>JPG, PNG, GIF, SVG, WEBP</p>
            </>
        )
     }
    </div>
  )
}

export default FileUploader