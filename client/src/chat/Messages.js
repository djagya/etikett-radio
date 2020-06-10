import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

export default function Messages({ messages, name }) {
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
    // <div className="Messages">
      <ScrollToBottom className={`Messages ${test}`}  >
        {renderMessages}
      </ScrollToBottom>
    // </div>
    
  )
}
