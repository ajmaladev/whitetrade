import Image from 'next/image'

export default function ReadyToShip() {
  return (
    <>
      {/* Structured Data for Shipping Information */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Ready to Ship',
            description: 'Products available for immediate shipping',
            serviceType: 'Shipping Service',
            provider: {
              '@type': 'Organization',
              name: 'White Trading Company',
            },
            areaServed: 'Worldwide',
            availability: 'https://schema.org/InStock',
          }),
        }}
      />

      <section className="w-full hidden md:block" aria-label="Ready to ship products">
        <Image
          src="/ready-to-ship.webp"
          alt="Ready to Ship - Products available for immediate shipping"
          width={513}
          height={111}
          className="md:ml-52 md:mt-32 mt-10 object-cover w-3/4 md:w-[513px] mx-auto"
          priority={false}
        />
      </section>
    </>
  )
}
