import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const HeaderRoot = styled('div')({
  flexGrow: 1,
});

const Title = styled(Typography)({
  flexGrow: 1,
  marginRight: theme => theme.spacing(2),
});

const ActiveLink = styled(Button)(({ theme, isActive }) => ({
  color: isActive ? theme.palette.secondary.main : 'inherit',
}));

const Header = () => {
  const location = useLocation();

  return (
    <HeaderRoot>
      <AppBar position="static">
        <Toolbar>
          <Title variant="h6">
            Node.js Task
          </Title>
          <ActiveLink
            component={Link}
            to="/"
            isActive={location.pathname === '/'}
          >
            Forms
          </ActiveLink>
          <ActiveLink
            component={Link}
            to="/tables"
            isActive={location.pathname === '/tables'}
          >
            Tables
          </ActiveLink>
        </Toolbar>
      </AppBar>
    </HeaderRoot>
  );
};

export default Header;
