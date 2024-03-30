// import React from 'react'

import { Helmet } from 'react-helmet-async';
import { ChatIndex } from './ChatIndex';

const ChatIndexPage = () =>
  <>
    <Helmet>
      <title>Chat</title>
    </Helmet>
    <ChatIndex />
  </>
    ;

export default ChatIndexPage;