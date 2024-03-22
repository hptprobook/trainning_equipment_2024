/* eslint-disable no-undef */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types'; // Add this line to import PropTypes

export default function CardPrompt({ title, content, handleClick }) {
  return (
    <Grid item xs={12} md={6} sm={12}>
      <Card variant="outlined">
        <CardContent
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f9f9f9',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)'
            }
          }}
          onClick={() => handleClick({ title: title, content: content })}>
          <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
CardPrompt.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  handleClick: PropTypes.func
};