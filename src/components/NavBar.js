import * as React from 'react';
import "../stylesheets/NavBar.scss";
import {AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab
} from '@mui/material/';

import MenuIcon from '@mui/icons-material/Menu';
import { Search } from './Search';

export const NavBar = ({search}) => {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: '50%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Item One" />
              <Tab value="two" label="Item Two" />
              <Tab value="three" label="Item Three" />
            </Tabs>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Flick Finder
          </Typography>
          <Search search={search} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
