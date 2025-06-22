import { MailIcon, MapPinIcon, PhoneIcon, StarIcon } from 'lucide-react'

export const AboutUs = () => {
  return (
    <div className="w-full min-h-screen relative bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:gap-16 gap-8 justify-center items-center">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold font-['Poppins'] text-white">
            About Us
          </h1>
        </div>

        {/* Rating Card */}
        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-64 h-20 bg-white rounded-[47.88px] shadow-[0px_22.722957611083984px_95.76103210449219px_0px_rgba(109,108,115,0.12)] outline outline-[9.74px] outline-neutral-200/40 flex items-center justify-center gap-2">
            <div>
              <div className="text-black text-xl font-semibold font-['Manrope'] leading-7">
                4.5/5
              </div>
              <div className="opacity-70 text-black text-xs font-medium font-['Manrope'] leading-tight">
                Rating
              </div>
            </div>
            <div className="flex gap-1 mb-1">
              <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
              <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
              <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
              <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
              <div className="relative w-5 h-5">
                <StarIcon className="w-5 h-5 fill-gray-300 text-gray-300 absolute inset-0" />
                <div className="absolute inset-0 w-1/2 overflow-hidden">
                  <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
        <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins'] leading-relaxed">
          At White Trading Company, we're more than a supplier—we're your trusted partner in growth.
          Built on a foundation of integrity, innovation, and customer-first service, we strive to
          deliver exceptional value through high-quality products and reliable solutions.
          <br />
          <br />
          Our mission is to empower businesses and individuals by making premium products and
          outstanding support easily accessible. Whether you're sourcing for retail, wholesale, or
          personal use, we're here to help you succeed.
          <br />
          <br />
          Driven by our core values—trust, quality, and innovation—we are committed to building
          lasting relationships and exceeding expectations at every step.
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mb-12 sm:mb-16 lg:mb-20">
        <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-orange-500 rounded-xl inline-flex justify-start items-start gap-2.5 hover:bg-orange-600 transition-colors">
          <div className="justify-start text-white text-base sm:text-lg font-semibold font-['Manrope'] leading-loose">
            Book a service
          </div>
        </button>
      </div>

      {/* Contacts Section */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Poppins'] text-white">
            Contacts
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
          <div className="flex flex-col gap-4 w-1/2 items-center md:items-start">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-white text-lg sm:text-xl font-medium font-['Poppins']">
                  Phone
                </span>
                <PhoneIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins']">
                0422 2321811 | 98430 44443
              </div>
            </div>

            {/* Email */}
            <div className="text-center md:text-left items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-white text-lg sm:text-xl font-medium font-['Poppins']">
                  Email
                </span>
                <MailIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins']">
                info@whitetradingcompany.com
              </div>
            </div>
          </div>

          <div className="text-center md:text-left w-1/2">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="text-white text-lg sm:text-xl font-medium font-['Poppins']">
                Location
              </span>
              <MapPinIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins']">
              45/2A - 1, Sungam Byepass Road 641045, Ramanathapuram, Coimbatore, Tamil Nadu, India -
              641045
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
