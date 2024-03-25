import { Helmet } from 'react-helmet-async';
import ChatDetail from './ChatDetail';

const ChatDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>Detail Chat</title>
      </Helmet>
      <ChatDetail />
    </>
  );
};

export default ChatDetailPage;