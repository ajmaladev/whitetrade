'use client'

import Image from 'next/image'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber = '+919876543210', // Default number, replace with actual
  message = 'Hello! I would like to know more about your products and services.',
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <Image
        src="/whatsapp.webp"
        alt="WhatsApp"
        width={32}
        height={32}
        className="w-auto h-auto object-contain"
      />

      {/* Tooltip */}
      <div className="absolute right-20 bottom-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>
    </button>
  )
}
