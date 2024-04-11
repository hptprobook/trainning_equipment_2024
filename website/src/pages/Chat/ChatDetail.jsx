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
  const lastScroll = React.useRef(null);
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
      setListMessage(dataMessage.dataMess);
      setHistoryChat({
        user: dataMessage.dataMess[dataMessage.dataMess.length - 2].content,
        model: dataMessage.dataMess[dataMessage.dataMess.length - 1].content,
      });
      setTimeout(() => {
        handleScrollLast();
      }, 1000);
    } else if (status === 'failed') {
      dispatch(resetMessages());
      handleToast('error', 'Không tìm thấy dữ liệu');
      navigate('/chat');
    }
  }, [dataMessage, status, navigate, dispatch]);
  useEffect(() => {
    if (statusChat === 'success') {
      dispatch(handleGetMessageByID({ id }));
      dispatch(resetState());
    } else if (statusChat === 'failed') {
      handleToast('error', 'Hệ thống xảy ra lỗi');
      dispatch(resetState());
      navigate('/chat');
    }
    else if (statusChat === 'loading') {
      handleScrollLast();
    }
  }, [statusChat, dispatch, id, navigate]);
  const mdReponsive = useResponsive('down', 'md');
  const handleGetContent = (content) => {
    handleScrollLast();
    if (content.model == 'gpt-4' || content.model == 'gpt-3.5-turbo') {
      let dataSend = {
        content: content.input,
        conversationId: listMessage[0].conversationId,
        model: content.model,
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
  const handleScrollLast = () => {
    lastScroll.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
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
      {mainHeight ? <Grid item xs={12}
        sx={{
          height: mainHeight ? `calc(100% - ${mainHeight}px)` : '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none', /* For Firefox */
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            width: 'auto' /* For horizontal scrollbar */,
            height: '0px' /* For vertical scrollbar */,
          },
        }}
      >
        {status === 'success' && listMessage.map((item) => (
          <CardAnswer
            key={item._id}
            name={item.isUserMessage ? user.dataUser.name : 'FPT.AI'}
            avatar={item.isUserMessage ? user.dataUser.avatar : 'https://www.w3schools.com/howto/img_avatar.png'}
            answer={item.content}
          />
        ))}
        {statusChat === 'loading' && <AnswerLoading />}
        <div ref={lastScroll}></div>
      </Grid> : <></>}
      <Grid ref={heightRef} item xs={12}>
        <InputChat handleGetContent={handleGetContent} />
      </Grid>
    </Grid>
  );
};
export default ChatDetail;
