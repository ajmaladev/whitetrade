'use client'

import { cn } from '@/utilities/ui'
import { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export const Marquee = ({
  children,
  className,
  speed = 20,
  direction = 'left',
  pauseOnHover = true,
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        'flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 justify-around',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex min-w-full shrink-0 justify-around',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  )
}
