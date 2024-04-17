import { Avatar, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useResponsive } from '~/config/reponsiveConfig';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import './style.css';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { forwardRef, useState } from 'react';
import copy from 'copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { findCode } from '~/config/regularExpressionConfig';
const CardAnswer = forwardRef(({ name, avatar, answer }, ref) => {
  const mdReponsive = useResponsive('down', 'sm');
  const [isCopied, setIsCopied] = useState(false);


  const handleCopyClick = (children) => {
    copy(String(children));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: mdReponsive ? 'calc(100% - 64px)' : 'calc(800px - 16px)',
        marginTop: '36px',

      }}
    >
      <Avatar
        alt={name}
        src={avatar}
        sx={{ width: 24, height: 24 }}
      />
      <Box
        sx={{
          width: mdReponsive ? 'calc(100% - 32px)' : 'calc(800px - 48px)',
          marginLeft: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
        <div
          style={{
            width: '100%',
            overflowY: 'hidden',
            overflowX: 'auto',
            '&::WebkitScrollbarTrackPiece:end': {
              width: 0,
              display: 'none'
            }
          }}
        >
          <Markdown
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <div className='highlight-block'>
                    <div className='block-btn'>
                      {isCopied ? <i>Coppied</i> : <ContentCopyIcon onClick={() => handleCopyClick(children)} fontSize='small' sx={{ cursor: 'pointer' }} />}
                    </div>
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      language={match[1]}
                      style={oneDark}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={findCode.exec(children) ? 'npm-block' : ''} {...rest}>
                    {children}
                    {findCode.exec(children) ? isCopied ? <i>Coppied</i> : <ContentCopyIcon onClick={() => handleCopyClick(children)} fontSize='small' sx={{ cursor: 'pointer' }} /> : null}
                  </code>
                );
              }
            }}
          >
            {answer}
          </Markdown>
        </div>
      </Box >
    </div >
  );
});
CardAnswer.protoType = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  answer: PropTypes.string,
};
export default CardAnswer;