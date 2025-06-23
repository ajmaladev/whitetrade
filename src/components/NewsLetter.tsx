export const NewsLetter = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative w-full h-48">
        <div
          className="w-full h-full bg-[#0A142F] shadow-lg"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 85%, 50% 100%, 15% 85%, 0 70%)',
          }}
        ></div>
        <div className="w-[510px] absolute top-0 h-16 bg-white p-20 flex gap-4">
          <div className="justify-start text-slate-900 text-3xl font-normal font-['Playfair_Display']">
            Subscribe Newsletters
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
