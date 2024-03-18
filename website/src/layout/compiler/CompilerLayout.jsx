import Box from '@mui/material/Box';
import { useState } from 'react';
import { runOnlineCompiler } from '~/APIs';
import PropTypes from 'prop-types';

export const CompilerLayout = ({ children }) => {


  return (
    <Box>
      {children}
    </Box>
  );
};

CompilerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};