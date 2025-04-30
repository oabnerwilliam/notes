import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <div 
      className='bg-bg text-secondary min-h-[200px]
      flex flex-col justify-center items-center gap-4 w-full'
      >
        <div 
        className='flex justify-center items-center gap-4 w-full'
        >
          <a 
          className='text-secondary text-2xl'
          href="https://github.com/oabnerwilliam" 
          target='_blank'>
            <FaGithub
            className='transition-all duration-300 ease-in-out cursor-pointer hover:fill-primary'
            />
          </a>  
          <a 
          className='text-secondary text-2xl' 
          href="https://www.linkedin.com/in/abner-william/"
          target='_blank'>
            <FaLinkedin
            className='transition-all duration-300 ease-in-out cursor-pointer hover:fill-primary'
            />
          </a>  
        </div>
        <p className='text-xl'><strong className='text-primary'>Notes&copy;</strong> 2025</p>
      </div>
    </>
  )
}

export default Footer
