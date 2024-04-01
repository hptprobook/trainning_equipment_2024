import { Grid } from '@mui/material';
import InputChat from '~/component/ChatComponent/InputChat';
import React, { useEffect } from 'react';
import { useResponsive } from '~/config/reponsiveConfig';
import CardAnswer from '~/component/Card/CardAnswer';
import { handleToast } from '~/config/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleGetMessageByID,
  resetMessages,
} from '~/redux/slices/messagesSlice';
import { chatWithGemini, resetState } from '~/redux/slices/chatSlice';
import AnswerLoading from '~/component/Loading/AnswerLoading';
const ChatDetail = () => {
  const { id } = useParams();
  const [listMessage, setListMessage] = React.useState([]);
  const [historyChat, setHistoryChat] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const heightRef = React.useRef(null);
  const [mainHeight, setMainHeight] = React.useState(0);
  React.useEffect(() => {
    if (heightRef.current) {
      setMainHeight(heightRef.current.clientHeight);
    }
  }, [heightRef]);
  const dataMessage = useSelector((state) => state.messages.data);
  const status = useSelector((state) => state.messages.status);
  const user = useSelector((state) => state.auth.userGit);
  const statusChat = useSelector((state) => state.chat.status);
  useEffect(() => {
    if (id) {
      dispatch(handleGetMessageByID({ id }));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (dataMessage && status === 'success') {
      console.log(dataMessage.dataMess);
      setListMessage(dataMessage.dataMess);
      setHistoryChat({
        user: dataMessage.dataMess[dataMessage.dataMess.length - 2].content,
        model: dataMessage.dataMess[dataMessage.dataMess.length - 1].content,
      });
    } else if (status === 'failed') {
      dispatch(resetMessages());
      handleToast('error', 'Message not found');
      navigate('/chat');
    }
  }, [dataMessage, status, navigate, dispatch]);
  useEffect(() => {
    if (statusChat === 'success') {
      dispatch(handleGetMessageByID({ id }));
      dispatch(resetState());
    } else if (statusChat === 'failed') {
      handleToast('error', 'Failed to call the API');
      dispatch(resetState());
      navigate('/chat');
    }
  }, [statusChat, dispatch, id]);
  const mdReponsive = useResponsive('down', 'md');
  const handleGetContent = (content) => {
    if (content.model == 'gpt') {
      let dataSend = {
        content: content.input,
        conversationId: listMessage[0].conversationId,
      };

      if (Object.keys(historyChat).length !== 0) {
        dataSend.history = historyChat;
      }
      dispatch(chatWithGemini({ data: dataSend }));
    } else {
      let dataSend = {
        content: content.input,
        conversationId: listMessage[0].conversationId,
      };

      if (Object.keys(historyChat).length !== 0) {
        dataSend.history = historyChat;
      }
      dispatch(chatWithGemini({ data: dataSend }));
    }
  };
  return (
    <Grid
      container
      spacing={2}
      flexDirection={'row'}
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: mdReponsive ? '100%' : '800px',
        maxWidth: '100%',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          height: mainHeight ? `calc(100% - ${mainHeight}px)` : '100%',
          overflowY: 'scroll',
          scrollbarWidth: 'none' /* For Firefox */,
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            width: 'auto' /* For horizontal scrollbar */,
            height: '0px' /* For vertical scrollbar */,
          },
        }}
      >
        {status === 'success' &&
          listMessage.map((item) => (
            <CardAnswer
              key={item._id}
              name={item.isUserMessage ? user.dataUser.name : 'FPT.AI'}
              avatar={
                item.isUserMessage
                  ? user.dataUser.avatar
                  : 'https://www.w3schools.com/howto/img_avatar.png'
              }
              answer={item.content}
            />
          ))}
        {statusChat === 'loading' && <AnswerLoading />}
      </Grid>
      <Grid ref={heightRef} item xs={12}>
        <InputChat handleGetContent={handleGetContent} />
      </Grid>
    </Grid>
  );
};
export default ChatDetail;
