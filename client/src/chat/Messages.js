import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import { css } from 'glamor';

export default function Messages({ messages, name, bottomSpace }) {
  const responsiveHeight = css({
    paddingBottom: bottomSpace,
  })
  const renderMessages = messages.map((message, i) => {
    return(
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    )
  })
  return (
      <ScrollToBottom className={`Messages ${responsiveHeight}`} >
        {renderMessages}
      </ScrollToBottom>    
  )
}
