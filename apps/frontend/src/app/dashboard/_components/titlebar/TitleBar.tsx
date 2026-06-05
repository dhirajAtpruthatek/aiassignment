import React from 'react'

type Props = {}

export default function TitleBar({ }: Props) {
     return (
          <div className='w-full  relative z-30  pt-3 pr-3'>
               <div className='w-full flex   flex-col justify-between rounded-[16px] bg-[#FFFFFFBF] px-4 py-4 sidebarShadow  '>TitleBar </div>
          </div>
     )
}