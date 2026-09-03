import React from 'react'

const Badge = ({badgeText, className}) => {
  return (
    <>
    <div className={`${className} px-8 py-2.75 bg-[#262626] text-white font-orebi font-bold text-[14px] w-23`}>{badgeText}</div>
    
    </>
  )
}

export default Badge