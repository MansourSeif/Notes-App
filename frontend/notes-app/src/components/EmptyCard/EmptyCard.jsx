import React from 'react'

const EmptyCard = ({imgSrc , message}) => {

  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={imgSrc} alt="" className='w-60' />

        <p className=' text-lg font-bold text-slate-700 text-center leading-7 mt-5 w-[78ch]'>
            {message}
        </p>
    </div>
  )
}

export default EmptyCard