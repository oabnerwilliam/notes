import React, { useEffect, useState } from 'react'

import style from './Message.module.css'

type MessageProps = {
    msg: string,
    type: string
}

const Message = ({msg, type}: MessageProps) => {
    return <p className={`${style.btn} ${style[type]}`}>{msg}</p>
}

export default Message
