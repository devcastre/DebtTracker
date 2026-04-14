'use client'


import { usePathname } from "next/navigation"
import { navLinks } from "@/app/config/navlinks";
import Link from "next/link";
import Image from "next/image";




export function NavItems({ mobile = false }) {

  const pathname = usePathname();

  return (
    <div className="w-full h-full">
      <ul       
      className={
        mobile
          ? "flex w-full justify-around px-2"
          : "flex flex-col gap-5 py-4"
      }
      >
        {navLinks.map((link) => {

          const isActive = pathname === link.href;

          return (            
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  relative
                  flex flex-row
                  items-center gap-1 
                  md:gap-3
                  p-2 
                  transition ease-in-out
                  text-sm font-semibold uppercase
                  ${mobile
                    ? "flex-1 justify-center mb-4"
                    : "w-full"}
                  ${
                    isActive
                      ? mobile

                        ? "text-(--primaryColor) bg-(--background) rounded-b-md"

                        : "text-(--primaryColor) bg-white rounded-md"
                      : "text-white hover:text-white hover:bg-white/20"
              }`}
              >
                <Image
                  src={isActive? link.icon2 : link.icon1}
                  alt={link.label}
                  width={30}
                  height={30}
                />
                {mobile ? isActive ? (<span className="text-xs mt-1">{link.label}</span>) : ('') : (<span className="text-xs mt-1">{link.label}</span>)}
              </Link>

            </li>);

        })}

      </ul>
    </div>
  )
}

