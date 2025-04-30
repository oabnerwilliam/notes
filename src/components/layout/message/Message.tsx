type MessageProps = {
    msg: string,
    type: string
}

const Message = ({msg, type}: MessageProps) => {
    return (
        <p className={`p-2
            ${type==="success"?
                "bg-primary text-p-text":
                "bg-red-500 text-white"}`}>{msg}</p>
    )
}

export default Message
