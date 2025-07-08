'use client'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import SearchContent from './SearchContent'

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
      aria-label={`Navigate to ${label} section`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  </li>
))

MenuItem.displayName = 'MenuItem'

const Logo = memo(({ onClick }: { onClick?: () => void }) => (
  <Link
    href="/"
    className="flex items-center flex-shrink-0 mt-4"
    onClick={onClick}
    aria-label="White Trading Company Homepage"
  >
    <Image
      src="/logo.svg"
      alt="White Trading Company Logo"
      width={160}
      height={40}
      className="w-32 md:w-40 h-10"
      priority
    />
  </Link>
))

Logo.displayName = 'Logo'

const SearchIcon = memo(({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="mb-2" aria-label="Open search" type="button">
    <Image
      src="/search.svg"
      alt="Search icon"
      width={20}
      height={20}
      className="w-8 h-8"
      priority
    />
  </button>
))

SearchIcon.displayName = 'SearchIcon'

export default function MegaMenu() {
  const [active, setActive] = useState<MenuKey>('products')
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)

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
        smoothScrollTo(targetElement, 2500, key)
      }

      // Close the drawer after clicking a link (for mobile)
      setDrawerOpen(false)
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

  // Generate structured data for navigation
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'White Trading Company Main Navigation',
    hasPart: menuItems.map((item) => ({
      '@type': 'WebPage',
      name: item.label,
      url: `https://whitetradingcompany.com/#${item.key}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header
        className="h-20 flex items-center w-full px-6 sm:px-12 md:px-16 lg:px-60 justify-between border-b border-gray-200"
        role="banner"
        aria-label="White Trading Company Header"
      >
        <Logo />
        {/* Desktop nav */}
        <nav
          className="gap-10 mt-auto hidden md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          <SearchIcon onClick={() => setSearchOpen(true)} />

          <div className="relative" ref={menuWrapperRef}>
            <ul className="flex items-center gap-6" role="menubar">
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
              aria-hidden="true"
            />
          </div>
        </nav>
        {/* Mobile nav: Drawer trigger */}
        <div className="flex md:hidden items-center gap-10 ml-auto">
          <SearchIcon onClick={() => setSearchOpen(true)} />

          <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen} direction="right">
            <DrawerTrigger asChild>
              <button aria-label="Open mobile menu" type="button">
                <Menu className="w-8 h-8" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="right-0 left-auto w-4/5 max-w-xs fixed top-0 h-full rounded-none p-0 flex flex-col !mt-0">
              <div className="flex items-center justify-between px-4 py-6 border-b">
                <Logo onClick={() => setDrawerOpen(false)} />
                <DrawerTrigger asChild>
                  <button aria-label="Close mobile menu" type="button">
                    <Menu className="w-8 h-8 rotate-90" />
                  </button>
                </DrawerTrigger>
              </div>
              <nav
                className="flex flex-col gap-6 px-6 py-8"
                role="navigation"
                aria-label="Mobile navigation"
              >
                <div className="flex justify-start mb-4">
                  <SearchIcon
                    onClick={() => {
                      setDrawerOpen(false)
                      setSearchOpen(true)
                    }}
                  />
                </div>
                <ul className="flex flex-col gap-4" role="menubar">
                  {menuItems.map(({ key, label }) => (
                    <li key={key} role="none">
                      <a
                        href={`#${key}`}
                        className={`block text-lg font-medium py-2 px-2 rounded transition-colors duration-200 ${active === key ? 'text-cyan-900' : 'text-black'}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleMenuClick(key)
                        }}
                        role="menuitem"
                        aria-label={`Navigate to ${label} section`}
                        aria-current={active === key ? 'page' : undefined}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Search Drawer */}
        <Drawer open={isSearchOpen} onOpenChange={setSearchOpen} direction="right">
          <SearchContent onClose={() => setSearchOpen(false)} />
        </Drawer>
      </header>
    </>
  )
}
