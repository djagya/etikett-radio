import React, {useContext} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import { Context } from "../Context";

export default function Messages({ messages, name }) {
  const {onChat} = useContext(Context)
  const test = {
    height: 0,
  }
  const renderMessages = messages.map((message, i) => {
    return(
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    )
  })


  return (
      <ScrollToBottom className={`Messages ${onChat ? "show-scroll" : "hide-scroll"} ${test}`}  >
        {renderMessages}
      </ScrollToBottom>    
  )
}
