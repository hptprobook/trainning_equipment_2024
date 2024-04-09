import React from 'react';
import styled from '@emotion/styled';
import MuiAppBar from '@mui/material/AppBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useTheme } from '@emotion/react';
// import { MenuIcon } from '@mui/icons-material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import PropTypes from 'prop-types';
import { Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { NAV_WIDTH } from './layoutConfig';
import { Link } from 'react-router-dom';

const drawerWidth = NAV_WIDTH;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Header = React.forwardRef(({ open, handleDrawerOpen }, ref) => {
	const theme = useTheme();
	return (
		<AppBar
			position="fixed"
			open={open}
			ref={ref}
			sx={{
				boxShadow: 'none',
			}}
		>
			<Toolbar
				sx={{
					backgroundColor: theme.palette.background.paper,
					// boxShadow: theme.shadows,
				}}
			>
				<IconButton
					aria-label="open menu"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						mr: 2,
						...(open && { display: 'none' }),
						color: theme.palette.text.primary,
					}}
				>
					<MenuIcon />
				</IconButton>
				<Button
					sx={{
						color: theme.palette.text.primary,
						position: 'absolute',
						right: '20px',
					}}
					size="medium"
				>
					<Link
						style={{
							display: 'flex',
							alignItems: 'center',
							textDecoration: 'none',
							color: theme.palette.text.primary,
						}}
						to="/"
					>
						<Typography
							sx={{
								fontWeight: 600,
								lineHeight: 1.5,
								marginTop: '3px',
							}}
						>
							Đi tới Compiler
						</Typography>
						<ChevronRightIcon />
					</Link>
				</Button>
			</Toolbar>
		</AppBar>
	);
});
Header.propTypes = {
	open: PropTypes.bool,
	handleDrawerOpen: PropTypes.func,
};
export default Header;
