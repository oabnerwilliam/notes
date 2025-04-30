import { Link } from 'react-router-dom'

const PageLink = ({to, text}: ButtonProps) => {
  return to && (
    <Link to={to}
    className='self-center justify-self-start
    text-secondary decoration-none
    transition-all duration-300 ease-in-out
    relative text-lg hover:text-primary
    before:content-[""] before:bg-primary before:absolute
    before:w-full before:bottom-[-5px] before:h-[2px]
    before:rounded-2xl before:transform before:scale-x-0
    before:transition-all before:ease-in-out before:duration-400 hover:before:scale-x-100'
    >{text}</Link>
  )
}

export default PageLink
