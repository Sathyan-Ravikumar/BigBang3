import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faComments, faArrowRightFromBracket, faHouse, faCircleInfo, faLocationDot, faImage } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ userId, userRole }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listIcons = [
    <FontAwesomeIcon icon={faHouse} beat />,
    <FontAwesomeIcon icon={faImage} beat />,
    <FontAwesomeIcon icon={faCircleInfo} beat />,
    <FontAwesomeIcon icon={faComments} beat />,
    <FontAwesomeIcon icon={faArrowRightFromBracket} beat />,
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('decodedToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }} >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: 'blue' }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="navtext"
            sx={{ textAlign: 'center', flexGrow: 1, color: 'Blue' }}
          >
            Do the very thing that others have not done! Vacation time!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{ marginBottom: '10%' }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{ text: 'Home', icon: faHouse, route: '/pack' },
          { text: 'Image Gallery', icon: faCircleInfo, route: '/gallery' },
          { text: 'Feedback', icon: faComments, route: '/feedback' },
          { text: 'Agent Request', icon: faLocationDot, route: '/request' },
          { text: 'Add Image', icon: faImage, route: '/admin' },
          { text: 'Agent', icon: faArrowRightFromBracket, route: '/agent' },
          { text: 'Logout', icon: faArrowRightFromBracket },
          ].filter((item) => {
            if (userRole === 'User') {
              return ['Home', 'Image Gallery', 'Feedback', 'Logout'].includes(item.text);
            } else if (userRole === 'Agent') {
              return ['Agent', 'Home', 'Image Gallery', 'Feedback', 'Logout'].includes(item.text);
            } else if (userRole === 'Admin') {
              return ['Add Image', 'Home', 'Image Gallery', 'Agent Request', 'Logout'].includes(item.text);
            }
            return false;
          }).map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={item.text !== 'Logout' ? Link : 'button'}
                to={item.route}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  mt: index === 6 ? 40 : 0,
                }}
                onClick={item.text === 'Logout' ? handleLogout : undefined}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {listIcons[index]}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        {/* Add your content here */}
      </Box>
    </Box>
  );
}
