import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import './style.css';
export default function CardPlan({
  label,
  price,
  description,
  description2,
  handleGetContent,
  planDate,
}) {
  const formatMoney = (x) => {
    x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    return x;
  };
  return (
    <Box sx={{ minWidth: 400 }}>
      <Card
        className="cartBuy"
        variant="outlined"
        sx={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          padding: '10px',
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="rgb(240, 110, 40)"
            gutterBottom
          >
            FPT AI
          </Typography>
          <Typography variant="h5" component="div">
            {label}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {formatMoney(price)}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography sx={{ mt: 1 }} variant="body2">
            {description2}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => handleGetContent({ price, planDate })}
            size="small"
            className="cartBuyBtn"
            sx={{
              minWidth: 400,
              color: 'white',
              background: 'rgb(223, 121, 66)',
              padding: '8px',
            }}
          >
            <b>Đăng ký</b>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
CardPlan.propTypes = {
  label: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  handleGetContent: PropTypes.func.isRequired,
  planDate: PropTypes.number,
};
