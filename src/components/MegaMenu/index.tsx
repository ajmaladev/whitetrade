'use client'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'

const MENU_KEYS = ['products', 'about', 'contact'] as const

type MenuKey = (typeof MENU_KEYS)[number]

const getMenuKeyFromHash = (hash: string): MenuKey => {
  const cleanHash = hash.replace('#', '')
  return MENU_KEYS.includes(cleanHash as MenuKey) ? (cleanHash as MenuKey) : 'products'
}

interface MenuItemProps {
  href: string
  label: string
  isActive: boolean
  menuRef: RefObject<HTMLAnchorElement | null>
  onClick: (key: MenuKey) => void
  menuKey: MenuKey
}

const MenuItem = memo(({ href, label, isActive, menuRef, onClick, menuKey }: MenuItemProps) => (
  <li className="flex flex-col items-center">
    <Link
      href={href}
      ref={menuRef}
      className={`text-base font-normal w-24 font-['Poppins'] mb-2 md:mb-3 transition-colors duration-200 ${
        isActive ? 'text-cyan-900' : 'text-black'
      }`}
      onClick={(e) => {
        e.preventDefault()
        onClick(menuKey)
      }}
    >
      {label}
    </Link>
  </li>
))

MenuItem.displayName = 'MenuItem'

const Logo = memo(() => (
  <Link href="/" className="flex items-center flex-shrink-0 mt-4">
    <Image
      src="/logo.svg"
      alt="logo"
      width={160}
      height={40}
      className="w-32 md:w-40 h-10"
      priority
    />
  </Link>
))

Logo.displayName = 'Logo'

const SearchIcon = memo(() => (
  <Image src="/search.svg" alt="search" width={20} height={20} className="w-8 h-8 mb-2" priority />
))

SearchIcon.displayName = 'SearchIcon'

export default function MegaMenu() {
  const [active, setActive] = useState<MenuKey>('products')
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  const productsRef = useRef<HTMLAnchorElement>(null)
  const aboutRef = useRef<HTMLAnchorElement>(null)
  const contactRef = useRef<HTMLAnchorElement>(null)

  const menuRefs = useMemo(
    () => ({
      products: productsRef,
      about: aboutRef,
      contact: contactRef,
    }),
    [],
  )

  const menuWrapperRef = useRef<HTMLDivElement>(null)

  // Custom smooth scroll function with configurable duration
  const smoothScrollTo = useCallback(
    (targetElement: HTMLElement, duration: number = 2000, key: MenuKey) => {
      const height = key === 'products' ? 200 : 0
      const targetPosition = targetElement.offsetTop - height // Account for header height
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }

      // Easing function for smooth acceleration/deceleration
      const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t * t + b
        t -= 2
        return (c / 2) * (t * t * t + 2) + b
      }

      requestAnimationFrame(animation)
    },
    [],
  )

  const handleMenuClick = useCallback(
    (key: MenuKey) => {
      const url = new URL(window.location.href)
      url.hash = key
      window.history.pushState({}, '', url.toString())
      setActive(key)

      // Use custom smooth scrolling with longer duration
      const targetElement = document.getElementById(key)
      if (targetElement) {
        smoothScrollTo(targetElement, 2500, key) // 2.5 seconds duration
      }
    },
    [smoothScrollTo],
  )

  useEffect(() => {
    // Set initial active state based on hash
    const hash = window.location.hash
    if (hash) {
      setActive(getMenuKeyFromHash(hash))
    }

    const handleHashChange = () => {
      const newHash = window.location.hash
      if (newHash) {
        setActive(getMenuKeyFromHash(newHash))
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const updateUnderlineStyle = () => {
      const activeRef = menuRefs[active]
      if (activeRef.current && menuWrapperRef.current) {
        const menuRect = menuWrapperRef.current.getBoundingClientRect()
        const itemRect = activeRef.current.getBoundingClientRect()
        setUnderlineStyle({
          left: itemRect.left - menuRect.left,
          width: itemRect.width,
        })
      }
    }

    updateUnderlineStyle()
    window.addEventListener('resize', updateUnderlineStyle)
    return () => window.removeEventListener('resize', updateUnderlineStyle)
  }, [active, menuRefs])

  const menuItems = useMemo(
    () => [
      { key: 'products' as const, label: 'Products' },
      { key: 'about' as const, label: 'About' },
      { key: 'contact' as const, label: 'Contact' },
    ],
    [],
  )

  return (
    <header className="h-20 flex items-center w-full px-6 sm:px-12 md:px-16 lg:px-60 justify-between border-b border-gray-200">
      <Logo />
      {/* Desktop nav */}
      <nav className="gap-10 mt-auto hidden md:flex">
        <SearchIcon />

        <div className="relative" ref={menuWrapperRef}>
          <ul className="flex items-center gap-6">
            {menuItems.map(({ key, label }) => (
              <MenuItem
                key={key}
                href={`#${key}`}
                label={label}
                isActive={active === key}
                menuRef={menuRefs[key]}
                onClick={handleMenuClick}
                menuKey={key}
              />
            ))}
          </ul>
          <div
            className="absolute bottom-0 h-[3px] bg-cyan-900 rounded-[50px] transition-all duration-300 ease-in-out"
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          />
        </div>
      </nav>
      {/* Mobile nav: Drawer trigger */}
      <div className="flex md:hidden items-center gap-10 ml-auto">
        <Image src="/search.svg" alt="search" width={20} height={20} className="w-8 h-8" priority />

        <Drawer>
          <DrawerTrigger asChild>
            <button aria-label="Open menu">
              <Menu className="w-8 h-8" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="right-0 left-auto w-4/5 max-w-xs fixed top-0 h-full rounded-none p-0 flex flex-col">
            <div className="flex items-center justify-between px-4 py-6 border-b">
              <Logo />
              <DrawerTrigger asChild>
                <button aria-label="Close menu">
                  <Menu className="w-8 h-8 rotate-90" />
                </button>
              </DrawerTrigger>
            </div>
            <div className="flex flex-col gap-6 px-6 py-8">
              <div className="flex justify-start mb-4">
                <SearchIcon />
              </div>
              <ul className="flex flex-col gap-4">
                {menuItems.map(({ key, label }) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className={`block text-lg font-medium py-2 px-2 rounded transition-colors duration-200 ${active === key ? 'text-cyan-900' : 'text-black'}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleMenuClick(key)
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
