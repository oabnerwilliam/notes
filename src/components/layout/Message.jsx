import React, { useEffect, useState } from 'react'

import style from './Message.module.css'

const Message = ({msg, type}) => {
    return <p className={`${style.btn} ${style[type]}`}>{msg}</p>
}

export default Message
