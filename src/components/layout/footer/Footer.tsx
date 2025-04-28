import style from './Footer.module.css'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <div className={style.footer}>
        <div className={style.icones}>
          <a className={style.icone} href="https://github.com/oabnerwilliam" 
          target='_blank'>
            <FaGithub/>
          </a>  
          <a className={style.icone} href="https://www.linkedin.com/in/abner-william/"
          target='_blank'>
            <FaLinkedin/>
          </a>  
        </div>
        <p><strong>Notes&copy;</strong> 2025</p>
      </div>
    </>
  )
}

export default Footer
