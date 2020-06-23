import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

export default function Messages({ messages, name }) {
  const renderMessages = messages.map((message, i) => {
    return(
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    )
  })
  return (
      <ScrollToBottom className="Messages" style={{padding: "5rem"}} >
        {renderMessages}
      </ScrollToBottom>    
  )
}
