import React from 'react'

const Button = ({ className = '', children, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`bg-[#262626] px-12.5 py-5 text-white font-orebi font-bold text-[18px] hover:px-13 hover:py-5.5 hover:text-[20px] hover:drop-shadow-[0_0px_16px_rgba(38,38,38,0.4)] duration-150 ease-in-out cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}

export default Button