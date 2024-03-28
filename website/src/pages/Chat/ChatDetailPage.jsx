import { Helmet } from 'react-helmet-async';
import ChatDetail from './ChatDetail';
import { useSelector } from 'react-redux';

const ChatDetailPage = () => {
  const dataConversations = useSelector((state) => state.conversations.data);

  return (
    <>
      <Helmet>
        <title>{dataConversations.mgs}</title>
      </Helmet>
      <ChatDetail />
    </>
  );
};

export default ChatDetailPage;