import React from 'react'
import style from './Container.module.css'

type ContainerProps = {
  children: React.ReactNode,
  customClass: string
}

const Container = (props: ContainerProps) => {
  return (
    <div className={`${style.container} ${style[props.customClass]}`}>
      {props.children}
    </div>
  )
}

export default Container
