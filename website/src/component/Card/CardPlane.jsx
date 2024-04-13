import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function CardPlan({
	label,
	price,
	description,
	handleGetContent,
  planDate
}) {
	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant="outlined">
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						FPT AI
					</Typography>
					<Typography variant="h5" component="div">
						{label}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{price}
					</Typography>
					<Typography variant="body2">{description}</Typography>
				</CardContent>
				<CardActions>
					<Button
						onClick={() => handleGetContent({ price, planDate })}
						size="small"
					>
						Đăng ký
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
  planDate: PropTypes.number
};
