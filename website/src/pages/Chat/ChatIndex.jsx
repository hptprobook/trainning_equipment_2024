
import { Grid } from '@mui/material';
import InputChat from '~/component/ChatComponent/InputChat';
import React, { useEffect } from 'react';
import { useResponsive } from '~/config/reponsiveConfig';
import NewChat from '~/component/ChatComponent/NewChat';
import InputChatWithPrompt from '~/component/ChatComponent/InputChatWithPrompt';
import { useDispatch, useSelector } from 'react-redux';
import { chatWithGemini, chatWithGpt, resetState } from '~/redux/slices/chatSlice';
import { handleAddConversation, resetStateAction } from '~/redux/slices/conversationsSlice';
import LoadingNewChat from '~/component/ChatComponent/LoadingNewChat';
import { useNavigate } from 'react-router-dom';
export const ChatIndex = () => {
  const heightRef = React.useRef(null);
  const [mainHeight, setMainHeight] = React.useState(0);
  const [userInput, setUserInput] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (heightRef.current) {
      setMainHeight(heightRef.current.clientHeight);
    }
  }, [heightRef]);
  const navigate = useNavigate();
  const mdReponsive = useResponsive('down', 'md');
  const [addPrompt, setAddPrompt] = React.useState(false);
  const [promt, setPromt] = React.useState({ title: '', content: '', template: '' });
  const [content, setContent] = React.useState({});
  const data = useSelector((state) => state.chat.data);
  const dataUser = useSelector((state) => state.auth.userGit);
  const dataConversations = useSelector((state) => state.conversations.data);
  const status = useSelector((state) => state.conversations.status);
  const statusChat = useSelector((state) => state.chat.status);

  useEffect(() => {
    if (status === 'success') {
      dispatch(resetStateAction());
      if (content.model == 'gpt') {
        dispatch(chatWithGpt({ data: { content: content.input, conversationId: dataConversations.conversationId } }));
      }
      else {
        dispatch(chatWithGemini({ data: { content: content.input, conversationId: dataConversations.conversationId } }));
      }
    }
  }, [status, dispatch, content, dataConversations]);
  useEffect(() => {
    if (data != undefined && dataConversations.conversationId != undefined && statusChat === 'success') {
      // na
      dispatch(resetState());
      navigate(`/chat/${dataConversations.conversationId}`);
    }
  }, [data, navigate, dataConversations]);
  const handleAddPrompt = (content) => {
    setPromt(content);
    setAddPrompt(true);
  };
  const handleCancel = () => {
    setAddPrompt(false);
  };
  const handleGetContent = (content) => {
    setUserInput(content.input);
    const titleArr = content.input.split(' ');
    const title = titleArr.slice(0, 10).join(' ');
    dispatch(handleAddConversation({ data: { title: title, idGit: dataUser.dataUser._id } }));
    setContent(content);
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
      <Grid item xs={12}
        sx={{
          height: mainHeight ? `calc(100% - ${mainHeight}px)` : '100%',
          overflow: 'auto',
        }}
      >
        {statusChat === 'loading' ? <LoadingNewChat name={dataUser.dataUser.name} avatar={dataUser.dataUser.avatar} answer={userInput} /> : <NewChat handleAddPrompt={handleAddPrompt} />}
      </Grid>
      <Grid ref={heightRef} item xs={12} >
        <InputChat handleGetContent={handleGetContent} />
        {addPrompt ? <InputChatWithPrompt promt={promt} handleGetContent={handleGetContent} handleCancel={handleCancel} /> : null}
      </Grid>
    </Grid>
  );
};
