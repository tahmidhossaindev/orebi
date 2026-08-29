import React from 'react'

const Image = ({imageSrc, imageAlt, className}) => {
  return (
   <>
   <img src={imageSrc} alt={imageAlt} className={`${className}`} />
   </>
  )
}

export default Image