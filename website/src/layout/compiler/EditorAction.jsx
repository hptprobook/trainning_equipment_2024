import Box from '@mui/material/Box';
import { truncateString } from '~/utils/formatters';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { programmingLanguages } from '~/utils/formatters';
import { useSelector } from 'react-redux';

export default function EditorAction({
  height,
  setSelectedLanguage,
  selectedLanguage,
  setTheme,
  theme,
  handleCopyCode,
  handleSaveCode,
  handleRunCode,
  title = '',
}) {
  const { isNextStepLoading, isRunCodeLoading } = useSelector(
    (state) => state.compiler
  );
  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

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
        <Box>
          <Select
            className="jr-first-step"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLanguage}
            label="Ngôn Ngữ"
            onChange={handleChangeLanguage}
            size="small"
            sx={{
              width: '200px',
              '& .MuiSelect-select': {
                color: theme === 'light' ? '#333' : '#fff',
              },
            }}
          >
            {programmingLanguages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value} sx={{}}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : (
        <Box
          sx={{
            color: theme === 'light' ? '#333' : '#fff',
          }}
        >
          <Tooltip title={title}>{truncateString(title, 20)}</Tooltip>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <Tooltip title={theme === 'light' ? 'Ban đêm' : 'Ban ngày'}>
          <IconButton
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            }}
            className="jr-second-step"
          >
            {theme === 'light' ? (
              <Brightness4Icon color="primary" />
            ) : (
              <Brightness7Icon color="primary" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Sao chép mã">
          <IconButton onClick={handleCopyCode} className="jr-third-step">
            <FileCopyIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lưu mã">
          <IconButton onClick={handleSaveCode} className="jr-fourth-step">
            <SaveIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chạy mã">
          <IconButton
            onClick={handleRunCode}
            color="primary"
            className="jr-fifth-step"
            disabled={isNextStepLoading || isRunCodeLoading}
          >
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
