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
import axios from 'axios';
import LoadingNewChat from '~/component/ChatComponent/LoadingNewChat';
const ChatDetail = () => {
  const { id } = useParams();
  const lastScroll = React.useRef(null);
  const [listMessage, setListMessage] = React.useState([]);
  const [historyChat, setHistoryChat] = React.useState({});
  const [answer, setAnswer] = React.useState('');
  const [loading, setLoading] = React.useState(false);
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
        user: dataMessage.dataMess[dataMessage.dataMess.length - 2]?.content,
        model: dataMessage.dataMess[dataMessage.dataMess.length - 1]?.content,
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
    } else if (statusChat === 'loading') {
      setTimeout(() => {
        handleScrollLast();
      }, 1000);
    }
  }, [statusChat, dispatch, id, navigate]);
  const mdReponsive = useResponsive('down', 'md');
  const handleGetContent = (content) => {
    setTimeout(() => {
      handleScrollLast();
    }, 1000);
    setAnswer(content.input);
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

  const handleGetVoice = async (blob) => {
    setLoading(true);
    const file = new File([blob], 'recorded_audio.webm', {
      type: 'audio/webm;codecs=opus',
    });
    const formData = new FormData();
    formData.append('speech', file);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/gpt/speech-to-text/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response) {
        setLoading(false);
        dispatch(handleGetMessageByID({ id }));
      }
    } catch (error) {
      handleToast('error', error.response.data.message || 'Hệ thống xảy ra lỗi');
    }
  };
  const handleGetDocx = async (docx) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('docx', docx);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/gpt/docx-to-text/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response) {
        setLoading(false);
        dispatch(handleGetMessageByID({ id }));
      }
    } catch (error) {
      setLoading(false);
      handleToast('error', error.response.data.message || 'Hệ thống xảy ra lỗi');
    }
  };
  const handleScrollLast = () => {
    lastScroll.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
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
      {mainHeight ? (
        <Grid
          item
          xs={12}
          sx={{
            height: mainHeight ? `calc(100% - ${mainHeight}px)` : '100%',
            overflow: 'auto',
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
                name={item.isUserMessage ? user.dataUser.name : 'BEE AI'}
                avatar={
                  item.isUserMessage ? user.dataUser.avatar : '/logo/white.png'
                }
                answer={item.content}
              />
            ))}
          {statusChat === 'loading' || loading ?
            <LoadingNewChat
              name={user.dataUser.name}
              avatar={user.dataUser.avatar}
              answer={answer || ''}/> : null}
          <div ref={lastScroll}></div>
        </Grid>
      ) : (
        <></>
      )}

      <Grid ref={heightRef} item xs={12}>
        <InputChat
          handleGetContent={handleGetContent}
          handleGetVoice={handleGetVoice}
          handleGetDocx={handleGetDocx}
        />
      </Grid>
    </Grid>
  );
};
export default ChatDetail;
