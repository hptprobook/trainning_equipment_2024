import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardPlan() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						FPT AI
          </Typography>
          <Typography variant="h5" component="div">
						1 Tháng
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
						1000000d
          </Typography>
          <Typography variant="body2">
						well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Đăng ký</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
