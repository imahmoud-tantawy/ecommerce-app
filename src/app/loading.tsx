import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen flex items-center flex-col gap-6 justify-center bg-primary'>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 animate-pulse">
            <div className='text-4xl font-black rounded-2xl bg-white text-primary w-16 h-16 flex items-center justify-center shadow-2xl shadow-black/20'>
              F
            </div>
            <div className='text-4xl font-black text-white tracking-tighter'>
              Fresh <span className="text-white/80">Cart</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner className='size-10 text-white' />
            <p className="text-white/60 font-medium animate-bounce tracking-widest uppercase text-[10px]">Loading Experience</p>
          </div>
        </div>
    </div>
  )
}
