import { Book, ChartPie, FileText, UsersRound, LayoutGrid } from "lucide-react"
import Link from "next/link"
type Props = {}

export default function LinksSection({ }: Props) {
     return (
          <div className=' space-y-0'>
               <LinkRender logo={<LayoutGrid />} title="Home" href="/dashboard" isActive={true} />
               <LinkRender logo={<UsersRound />} title="My Groups" href="/dashboard/groups" isActive={false} />
               <LinkRender
                    logo={<FileText />}
                    title="Assignments"
                    href="/dashboard/assignments"
                    isActive={false}
                    endIcon={
                         <div className=" bg-[#FF5623] text-sm px-2 rounded-lg flex items-center font-semibold leading-[0%] h-5  text-[#FFFFFF]">20</div>
                    }
               />
               <LinkRender logo={<Book />} title="AI Teacher’s Toolkit" href="/dashboard" isActive={false} />
               <LinkRender logo={<ChartPie />} title="My Library" href="/dashboard" isActive={false} />

          </div>
     )
}



function LinkRender({ logo, title, endIcon, href, isActive = false }: { isActive?: boolean, logo: React.ReactNode, title: string, endIcon?: React.ReactNode, href: string }) {
     return (
          <Link href={href} className={` flex flex-row ${isActive && "bg-[#F0F0F0] "} justify-between items-center px-3 py-2.5 rounded-[8px]`}>
               <div className={` flex items-center gap-2 ${isActive && "text-TWO font-medium "} `}>
                    {logo}
                    <span className={` leading-[140%]  text-[16px] ${isActive && "text-TWO font-medium "}`}>{title}</span>
               </div>
               {endIcon && endIcon}
          </Link>
     )
}


