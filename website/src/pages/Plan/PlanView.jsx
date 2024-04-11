import Grid from '@mui/material/Unstable_Grid2';
import CardPlan from '~/component/Card/CardPlane';

const PlanView = () => {
	const CustomGrid = ({ backgroundColor, children }) => (
		<Grid
			item
			xs={12}
      md={4}
			sx={{
				backgroundColor: backgroundColor,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
        padding: '48px 0'
			}}
		>
			{children}
		</Grid>
	);

	return (
		<Grid container sx={{ height: '100vh', margin: 0, overflow: 'auto' }}>
			<CustomGrid backgroundColor="rgb(10,82,160)">
				<CardPlan />
			</CustomGrid>
			<CustomGrid backgroundColor="rgb(240,110,40)">
				<CardPlan />
			</CustomGrid>
			<CustomGrid backgroundColor="rgb(80,185,70)">
				<CardPlan />
			</CustomGrid>
		</Grid>
	);
};

export default PlanView;
