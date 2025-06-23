'use client'

import { useActionState } from 'react'
import { subscribeNewsletter } from './NewsLetter/actions'

export const NewsLetter = () => {
  const [state, formAction] = useActionState(
    async (prevState: { message: string; error: boolean }, formData: FormData) => {
      return await subscribeNewsletter(formData)
    },
    { message: '', error: false },
  )

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="relative w-full h-32">
        <div
          className="w-full h-full bg-[#0A142F] shadow-lg"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 85%, 50% 100%, 15% 85%, 0 70%)',
          }}
        ></div>
        <div className="w-full md:mx-0 border-box md:w-3/4 absolute rounded-xl top-20 left-1/2 transform -translate-x-1/2 bg-white md:px-[103px] md:py-[55px] px-[20px] py-[30px] flex flex-col lg:flex-row gap-4 justify-between items-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="justify-start text-slate-900 text-3xl font-normal font-['Playfair_Display']">
            Subscribe Newsletters
          </div>
          <form action={formAction} className="w-[300px] md:w-[510px] h-16 relative">
            <div className="w-[300px] md:w-[510px] h-16 left-0 top-0 absolute opacity-10 bg-white rounded outline outline-2 outline-offset-[-1px] outline-slate-900" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-[300px] md:w-[510px] h-16 left-0 top-0 absolute bg-transparent px-6 py-4 text-slate-700 text-base font-normal font-['Manrope'] placeholder-slate-700 placeholder-opacity-50 focus:outline-none focus:ring-0 border-none"
              required
            />
            <button
              type="submit"
              className="w-32 h-10 md:w-44 md:h-14 left-[157px] md:left-[330px] top-[11px] md:top-[4px] absolute overflow-hidden bg-[#0081FE] rounded hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              <div className="text-white text-base font-medium font-['Helvetica_Neue']">
                Subscribe Now
              </div>
            </button>
          </form>
        </div>

        {/* Success/Error Message */}
        {state?.message && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div
              className={`px-4 py-2 rounded-md text-sm ${
                state.error
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-green-100 text-green-700 border border-green-300'
              }`}
            >
              {state.message}
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  )
}
