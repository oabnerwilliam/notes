import React from 'react'

import loader from '../../img/loading.svg'

import style from './Loader.module.css' 

const Loader = ({fullScreen = false}) => {
  return (
    <div className={`${style.loaderContainer}
    ${fullScreen ? style.fullScreen : ''}`}>
        <img src={loader} alt="Loading..."/>    
    </div>
  )
}

export default Loader
