import React from 'react'

const ErrorPage = () => {
  return (
    <div className='flex justify-center flex-col items-center h-screen'>
      <img src="/error.png" alt="" className='w-32 md:w-40 object-contain'/>
        <h1 className='font-bold text-5xl '>Error</h1>
        <h2 className='font-semibold text-2xl text-gray-600'>Page Not Found</h2>
    </div>
  )
}

export default ErrorPage