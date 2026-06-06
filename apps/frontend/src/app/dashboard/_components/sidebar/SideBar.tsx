import Logo from '@/components/layout/public/Logo'

import SchoolInfo, { AiToolKitButton } from './SchoolInfo'
import LinksSection from './LinksSection'

type Props = {}

export default function SideBar({ }: Props) {
  return (

    <div className=' md:relative absolute z-50 w-75 p-3 h-full'>
      <div className=' w-full flex h-full flex-col justify-between rounded-[16px] bg-[rgba(255,255,255,1)] p-6 sidebarShadow'>
        <div className=' space-y-12'>
          <Logo />
          <AiToolKitButton />
          <LinksSection />
        </div>

        <div>

          <SchoolInfo />
        </div>

      </div>
    </div>
  )
}


