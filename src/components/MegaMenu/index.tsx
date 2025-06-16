'use client'
import Image from 'next/image'
import Link from 'next/link'
import { RefObject, useEffect, useRef, useState } from 'react'

const MENU_KEYS = ['products', 'about', 'contact'] as const

type MenuKey = (typeof MENU_KEYS)[number]

export default function MegaMenu() {
  const [active, setActive] = useState<MenuKey>('products')
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const menuRefs: Record<MenuKey, RefObject<HTMLAnchorElement | null>> = {
    products: useRef<HTMLAnchorElement | null>(null),
    about: useRef<HTMLAnchorElement | null>(null),
    contact: useRef<HTMLAnchorElement | null>(null),
  }
  const menuWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const activeRef = menuRefs[active]
    if (activeRef.current && menuWrapperRef.current) {
      const menuRect = menuWrapperRef.current.getBoundingClientRect()
      const itemRect = activeRef.current.getBoundingClientRect()
      setUnderlineStyle({
        left: itemRect.left - menuRect.left,
        width: itemRect.width,
      })
    }
  }, [active])

  return (
    <header className="h-20 flex items-center w-full px-4 md:px-16 lg:px-32">
      {/* Logo */}
      <Link href="/" className="flex items-center pl-2 md:pl-8 lg:pl-12 flex-shrink-0 mt-7">
        <Image src="/logo.svg" alt="logo" width={160} height={40} className="w-32 md:w-40 h-10" />
      </Link>
      {/* Centered Menu */}
      <nav className="flex-1 flex justify-center mt-auto">
        <div className="relative" ref={menuWrapperRef}>
          <ul className="flex items-center gap-6 md:gap-10 lg:gap-12">
            <li>
              <Image src="/search.svg" alt="search" width={20} height={20} className="w-8 h-8" />
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="#products"
                ref={menuRefs.products as any}
                className={`text-base font-normal font-['Poppins'] mb-2 md:mb-3 ${active === 'products' ? 'text-cyan-900' : 'text-black'}`}
                onClick={() => setActive('products')}
              >
                Products
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="#about"
                ref={menuRefs.about as any}
                className={`text-base font-normal font-['Poppins'] mb-2 md:mb-3 ${active === 'about' ? 'text-cyan-900' : 'text-black'}`}
                onClick={() => setActive('about')}
              >
                About
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="#contact"
                ref={menuRefs.contact as any}
                className={`text-base font-normal font-['Poppins'] mb-2 md:mb-3 ${active === 'contact' ? 'text-cyan-900' : 'text-black'}`}
                onClick={() => setActive('contact')}
              >
                Contact
              </Link>
            </li>
          </ul>
          {/* Animated Underline */}
          <div
            className="absolute bottom-0 h-[3px] bg-cyan-900 rounded-[50px] transition-all duration-300"
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          />
        </div>
      </nav>
    </header>
  )
}
