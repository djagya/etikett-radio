import React, { useContext, Fragment } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import { css } from 'glamor';
import { Context } from '../Context';

export default function Messages({ messages, name, bottomSpace }) {
  const { onChat } = useContext(Context);
  const responsiveHeight = css({
    paddingBottom: bottomSpace,
  });

  const renderMessages = messages.map((message, i) => {
    return (
      <Fragment key={i}>
        <Message message={message} name={name} />
      </Fragment>
    );
  });

  return (
    <ScrollToBottom
      className={`Messages ${
        onChat ? 'show-scroll' : 'hide-scroll'
      } ${responsiveHeight}`}>
      {renderMessages}
    </ScrollToBottom>
  );
}
