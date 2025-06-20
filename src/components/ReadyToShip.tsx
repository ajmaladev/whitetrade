import Image from 'next/image'

export default function ReadyToShip() {
  return (
    <div className="w-full">
      <Image
        src="/ready-to-ship.png"
        alt="Ready to Ship"
        width={513}
        height={111}
        className="md:ml-52 md:mt-32 mt-10 object-cover w-3/4 md:w-auto mx-auto"
      />
    </div>
  )
}
