'use client'
import { Button } from '../ui/button'

export default function BuyNow() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+919843044489' // Replace with actual number
    const message =
      'Hello! I would like to buy your products. Can you please provide me with more information about pricing and availability?'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="flex justify-center w-full" aria-label="Call to action">
      <Button
        onClick={handleWhatsAppClick}
        className="relative bg-gradient-to-r from-cyan-900 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out to-[#36559b] px-10 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-start text-white text-2xl font-semibold hover:scale-105"
        aria-label="Start trading with White Trading Company"
      >
        BUY NOW
      </Button>
    </section>
  )
}
