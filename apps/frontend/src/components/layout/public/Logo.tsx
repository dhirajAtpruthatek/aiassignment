import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

type Props = {}

export default function Logo({ }: Props) {
     return (
          <div className=' flex items-center gap-3'>
               <div className=' relative size-10'>
                    <Image src="/assets/logo.svg" alt="vedaAi" fill  />
               </div>
               <span className=' font-bricolage text-[28px] tracking-[-6%] font-bold text-TWO'>{APP_NAME}</span>
          </div>
     )
}