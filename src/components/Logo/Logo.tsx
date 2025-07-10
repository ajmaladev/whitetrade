import Image from 'next/image'
import Link from 'next/link'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <Link
      href="/"
      className="flex items-center flex-shrink-0"
      aria-label="White Trading Company Homepage"
    >
      <Image
        src="/logo.svg"
        alt="White Trading Company Logo"
        width={160}
        height={40}
        className="w-48 h-10"
        priority
      />
    </Link>
  )
}
