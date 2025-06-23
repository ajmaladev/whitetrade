'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

function ErrorCard() {
  const pathname = usePathname()
  return (
    <div className="flex flex-col items-center py-24 px-6 gap-12">
      <div className="flex justify-center items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BUNNY_CDN}/globals/images/500-error.svg`}
          alt="error"
          width={250}
          height={250}
        />
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-4xl">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-leadingH2">
            Sorry! It’s a 500 Server Error.
          </h1>

          <p className="text-center text-subheading text-xl font-normal leading-leadingPara">
            We apologise for the inconvenience. Please try again later or go to our Main page.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <>
            {pathname.split('/')[1] === '' ? (
              <Link href={'/'}>
                <Button className="font-semibold !h-52 px-6">Refresh This Page</Button>
              </Link>
            ) : (
              <Link href={'/'}>
                <Button className="font-semibold !h-52 px-6">Go to Homepage</Button>
              </Link>
            )}
          </>
        </div>
      </div>
    </div>
  )
}

export default ErrorCard
