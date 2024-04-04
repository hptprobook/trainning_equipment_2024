import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { truncateString } from '~/utils/formatters';

export default function EditorAction({
  height,
  setSelectedLanguage,
  selectedLanguage,
  setTheme,
  theme,
  handleCopyCode,
  handleSaveCode,
  handleRunCode,
  isCompiling,
  title = '',
}) {
  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        borderBottom: '1px solid #c9c6c6',
        overflowX: 'auto',
      }}
    >
      {!title ? (
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => setSelectedLanguage('javascript')}
          >
            <img
              width={30}
              style={{
                border:
                  selectedLanguage === 'javascript'
                    ? '2px solid #ba000d'
                    : 'none',
              }}
              height={30}
              alt="JavaScript"
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Javascript_badge.svg/946px-Javascript_badge.svg.png'
              }
            />
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => setSelectedLanguage('python')}
          >
            <img
              style={{
                border:
                  selectedLanguage === 'python' ? '2px solid #ba000d' : 'none',
              }}
              width={30}
              height={30}
              alt="Python"
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png'
              }
            />
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => setSelectedLanguage('php')}
          >
            <img
              style={{
                border:
                  selectedLanguage === 'php' ? '2px solid #ba000d' : 'none',
              }}
              width={30}
              height={30}
              alt="PHP"
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/800px-PHP-logo.svg.png'
              }
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            color: theme === 'light' ? '#333' : '#fff',
          }}
        >
          {truncateString(title, 20)}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'dark' : 'light'}
        </Button>
        <Button onClick={handleCopyCode} variant="contained" size="small">
          Copy
        </Button>
        <Button onClick={handleSaveCode} variant="contained" size="small">
          Save
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleRunCode}
          disabled={isCompiling}
        >
          Run
        </Button>
      </Box>
    </Box>
  );
}
