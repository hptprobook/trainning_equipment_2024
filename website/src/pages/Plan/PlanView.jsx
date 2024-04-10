import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

const PlanView = () => {
  return (
    <Grid container spacing={3} sx={{ height: '100%' }}>
      <Grid
        item
        xs={4}
        sx={{
          backgroundColor: 'rgb(10,82,160)',
        }}
      >
        <h1>Kế hoạch</h1>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          backgroundColor: 'rgb(240,110,40)',
        }}
      >
        <p>Đây là trang kế hoạch</p>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          backgroundColor: 'rgb(80,185,70)',
        }}
      >
        <p>Đây là trang kế hoạch</p>
      </Grid>
    </Grid>
  );
};

export default PlanView;
