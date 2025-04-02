import React from 'react'

import style from './Footer.module.css'

import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <div className={style.footer}>
        <div className={style.icones}>
          <div className={style.icone}>
            <FaInstagram/>
          </div>
          <div className={style.icone}>
            <FaFacebook/>
          </div>
          <div className={style.icone}>
            <FaLinkedin/>
          </div>  
        </div>
        <p><strong>Notes&copy;</strong> 2025</p>
      </div>
    </>
  )
}

export default Footer
