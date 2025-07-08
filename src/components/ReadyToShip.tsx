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

      <section className="w-full" aria-label="Ready to ship products" id="products">
        {/* <Image
          src="/ready-to-ship.webp"
          alt="Ready to Ship - Products available for immediate shipping"
          width={513}
          height={111}
          className="md:ml-40 md:mt-32 sm:mt-10 object-cover w-3/4 md:w-[513px] mx-auto"
          priority={false}
        /> */}
        <div
          className="justify-start text-[37px] md:mt-32 sm:mt-10  text-center w-full lg:text-left md:text-[4rem] lg:text-[6rem] lg:pl-40 font-bold font-['Poppins'] bg-clip-text text-transparent inline-block"
          style={{
            background: 'linear-gradient(90deg, #3E66DF 0%, #3E66DF 25%, #4C6284 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          Ready to ship
        </div>
      </section>
    </>
  )
}
