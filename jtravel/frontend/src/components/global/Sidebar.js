import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import {
  FormControlLabel,
  Switch,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Modal,
  ListItemText,
  ListItemButton,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  Drawer,
  Box,
  Badge,
  Backdrop,
  Fade,
  alpha,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { WebIcon, UserIcon, FunctionIcon } from './SidebarButtons';
import useValidation from '../../hooks/useValidation';
import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../utils/Axios';
import { bgcolor } from '@mui/system';

const drawerWidth = 180;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: '195ms',
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: '225ms',
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const LoginTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#263238',
    },
    input: { color: 'white' },
    backgroundColor: '#263238'
  }
});

const LoginBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '30px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 500,
  backgroundColor: alpha('#37474f', 0.90),
  borderRadius: '16px',
  boxShadow: 24,
  padding: theme.spacing(7)
}));

const SignUpBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '30px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 650,
  backgroundColor: alpha('#37474f', 0.90),
  borderRadius: '16px',
  boxShadow: 24,
  padding: theme.spacing(7)
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Sidebar({ appTheme, setAppTheme }) {

  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const register_URL = 'account/auth/register/';
  const login_URL = 'account/auth/login/';
  const logout_URL = 'account/auth/logout/';

  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [registerAlert, setRegisterAlert] = useState(false);
  const [registerFailedAlert, setRegisterFailedAlert] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [loginFailedAlert, setLoginFailedAlert] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const openAccountMenu = Boolean(anchorEl);
  const { emailError, usernameError, passwordError, matchError, isError }
    = useValidation(email, username, password1, password2);
  const { auth, setAuth, requireLoginAlert, setRequireLoginAlert } = useAuth();

  const toggleLoginWindow = () => {
    setOpenLogin(!openLogin);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleRegistration = () => {
    setOpenRegistration(!openRegistration);
  };

  const closeRegisterAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setRegisterAlert(false);
  };

  const closeRegisterFailedAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setRegisterFailedAlert(false);
  };

  const closeLoginAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setLoginAlert(false);
  };

  const closeLoginFailedAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoginFailedAlert(false);
  };

  const closeRequireLoginAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setRequireLoginAlert(false);
  };

  const toggleRegisterAlert = () => {
    setRegisterAlert(true);
  };

  const toggleRegisterFailedAlert = () => {
    setRegisterFailedAlert(true);
  };

  const toggleLoginAlert = () => {
    setLoginAlert(true);
  };

  const toggleLoginFailedAlert = () => {
    setLoginFailedAlert(true);
  };

  const handleRegistration = async () => {
    try {
      await axiosInstance.post(register_URL, {
        'email': email,
        'username': username,
        'name': name,
        'password': password1
      });
      toggleRegisterAlert();
    } catch (err) {
      toggleRegisterFailedAlert();
    };
  };

  const handleLogin = async () => {
    try {
      await axiosInstance.post(login_URL, {
        'email': loginEmail,
        'password': loginPassword,
        withCredentials: true
      })
        .then((resp) => {
          localStorage.setItem('access_token', resp.data.access);
          localStorage.setItem('refresh_token', resp.data.refresh);
          const accessToken = resp?.data?.access;
          const refreshToken = resp?.data?.refresh;
          const user = resp?.data?.user;
          setAuth({ user, accessToken, refreshToken });
          navigate(from, { replace: true })
        });
      toggleLoginAlert();
    } catch (err) {
      toggleLoginFailedAlert();
    };
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post(logout_URL, {
        refresh_token: localStorage.getItem('refresh_token')
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      axiosInstance.defaults.headers['Authorization'] = null;
      setAuth('');
    } catch (err) {
      console.log(err);
    }
  };

  const toggleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAccountMenu = () => {
    setAnchorEl(null);
  };

  const logger = () => {
    console.log(auth)
  };

  return (
    <Box>
      {/* Login Form */}
      <Modal aria-labelledby='Login' aria-describedby='Login Page' open={openLogin} onClose={toggleLoginWindow}
        closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }} >
        <Fade in={openLogin}>
          <LoginBox>
            <Typography variant='h4' color='white'>
              Sign In
            </Typography>
            <Box component='form' noValidate autoComplete='new-password' sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <LoginTextField label='Email' variant='outlined' onChange={(e) => setLoginEmail(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }} />
              <LoginTextField label='Password' variant='outlined' type='password' onChange={(e) => setLoginPassword(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }} />
            </Box>
            <Button variant='contained' color='inherit' startIcon={<LoginRoundedIcon />} onClick={() => { handleLogin(); toggleLoginWindow(); }}
              sx={{ height: 52, fontSize: 18, textTransform: 'none' }}>
              Login
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end ' }}>
              <Button onClick={() => { toggleLoginWindow(); toggleRegistration(); }} sx={{ fontSize: 15, color: '#03a9f4', textTransform: 'none' }}>
                Create an Account
              </Button>
            </Box>
          </LoginBox>
        </Fade>
      </Modal>
      {/* Registration Form */}
      <Modal open={openRegistration} onClose={toggleRegistration} aria-labelledby='Registration Page' aria-describedby='Registration Page'
        BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }} >
        <Fade in={openRegistration}>
          <SignUpBox>
            <Typography variant='h4' color='white'>
              Sign Up
            </Typography>
            <Box component='form' noValidate sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <LoginTextField name='email' label='Email' variant='outlined'
                helperText={email.length > 0 ? emailError : ''} error={email.length > 0 && emailError.length > 0 ? true : false}
                onChange={e => setEmail(e.target.value)} InputLabelProps={{ style: { color: 'white' } }} />
              <LoginTextField name='username' label='User ID' variant='outlined'
                helperText={username.length > 0 ? usernameError : ''} error={username.length > 0 && usernameError.length > 0 ? true : false}
                onChange={e => setUsername(e.target.value)} InputLabelProps={{ style: { color: 'white' } }} />
              <LoginTextField name='name' label='Name' variant='outlined'
                onChange={e => setName(e.target.value)} InputLabelProps={{ style: { color: 'white' } }} />
              <LoginTextField name='password1' label='Password' variant='outlined' type='password'
                helperText={password1.length > 0 ? passwordError : ''} error={password1.length > 0 && passwordError.length > 0 ? true : false}
                onChange={e => setPassword1(e.target.value)} InputLabelProps={{ style: { color: 'white' } }} />
              <LoginTextField name='password2' label='Confirm Password' variant='outlined' type='password'
                helperText={password2.length > 0 ? matchError : ''} error={password2.length > 0 && matchError.length > 0 ? true : false}
                onChange={e => setPassword2(e.target.value)} InputLabelProps={{ style: { color: 'white' } }} />
            </Box>
            <Button variant='contained' color='inherit' disabled={isError ? true : false} startIcon={<VpnKeyRoundedIcon />}
              onClick={() => { handleRegistration(); toggleRegistration(); }}
              sx={{ height: 52, fontSize: 18, textTransform: 'none' }}>
              Register
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end ' }}>
              <Button onClick={() => { toggleLoginWindow(); toggleRegistration(); }}
                sx={{ fontSize: 15, color: '#03a9f4', textTransform: 'none' }}>
                Sign In
              </Button>
            </Box>
          </SignUpBox>
        </Fade>
      </Modal>
      {/* App Bar */}
      <Box>
        <AppBar open={open} sx={{ bgcolor: '#263238' }}>
          <Toolbar position='sticky'>
            <IconButton aria-label='open drawer' onClick={toggleDrawer} edge='start'
              sx={{ color: 'inherit', mr: 6, ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link to='/' style={{ fontSize: 22 }}>
                J - Travel
              </Link>
            </Typography>
            <Typography sx={{ flex: 1 }}>
            </Typography>
            {!auth?.accessToken
              ?
              <>
                <Button color='primary' variant='contained' onClick={toggleLoginWindow} startIcon={<VpnKeyRoundedIcon />}
                  sx={{ textTransform: 'none', fontSize: 14 }}>
                  Login
                </Button>
              </>
              :
              <>
                <IconButton size='large' color='inherit' onClick={logger}>
                  <Badge badgeContent={11} color='error'>
                    <VpnKeyRoundedIcon fontSize='inherit' />
                  </Badge>
                </IconButton>
                <IconButton size='large' aria-label='mail' color='inherit'>
                  <Badge badgeContent={20} color='error'>
                    <MailIcon fontSize='inherit' />
                  </Badge>
                </IconButton>
                <IconButton size='large' aria-label='notification' color='inherit'>
                  <Badge badgeContent={32} color='error'>
                    <NotificationsIcon fontSize='inherit' />
                  </Badge>
                </IconButton>
                {/* Account Menu */}
                <Tooltip title='Account Settings'>
                  <IconButton onClick={toggleAccountMenu} size="small"
                    aria-controls={openAccountMenu ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAccountMenu ? 'true' : undefined}
                    sx={{ ml: 0.5, mr: 2 }}>
                    <Avatar sx={{ width: 28, height: 28 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id='account-menu'
                  open={openAccountMenu}
                  onClose={closeAccountMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32, height: 32, ml: -0.5, mr: 2,
                      },
                      '&:before': {
                        content: '""', display: 'block', position: 'absolute',
                        top: 0, right: 14, width: 10, height: 10,
                        bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}>
                  <MenuItem onClick={() => {closeAccountMenu(); navigate('profile/')}}>
                    <Avatar /> Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={closeAccountMenu}>
                    <ListItemIcon sx={{ mr: 1.5 }}>
                      <Badge color='error' badgeContent={125}>
                        <FavoriteRoundedIcon />
                      </Badge>
                    </ListItemIcon>
                    Liked Posts
                  </MenuItem>
                  <MenuItem onClick={closeAccountMenu}>
                    <ListItemIcon sx={{ mr: 1.5 }}>
                      <Badge color='error' badgeContent={17}>
                        <BookmarkRoundedIcon />
                      </Badge>
                    </ListItemIcon>
                    Saved
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={closeAccountMenu}>
                    <ListItemIcon sx={{ mr: 1.5 }}>
                      <Settings />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={closeAccountMenu}>
                    <ListItemIcon sx={{ mr: 1.5 }}>
                      <AnnouncementIcon />
                    </ListItemIcon>
                    Report
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <FormControlLabel
                      control={<MaterialUISwitch 
                      onChange={() => setAppTheme(appTheme === 'light' ? 'dark' : 'light')}
                      checked={appTheme === 'light' ? false : true} />}
                      label={appTheme === 'light' ? 'Light Theme' : 'Dark Theme'} />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => {handleLogout(); closeAccountMenu();}}>
                    <ListItemIcon sx={{ mr: 1.5 }}>
                      <Logout />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            }
          </Toolbar>
        </AppBar>
        {/* Drawer */}
        <Drawer sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
          onBackdropClick={toggleDrawer} variant='temporary' anchor='left' open={open}>
          <DrawerHeader>
            <IconButton onClick={toggleDrawer}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {WebIcon.map((item, index) => {
              return (
                <Link to='home/' key={index}>
                  <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Link>
              )
            })}
          </List>
          <Divider />
          <List>
            {UserIcon.map((item, index) => {
              return (
                <ListItemButton key={index}
                  sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              )
            })}
          </List>
          <Divider />
          <List>
            {FunctionIcon.map((item, index) => {
              return (
                <ListItemButton key={index}
                  sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              )
            })}
          </List>
        </Drawer>
      </Box>
      {/* Registration Alert */}
      <Snackbar open={registerAlert} autoHideDuration={5000} onClose={closeRegisterAlert}>
        <Alert severity='success' onClose={closeRegisterAlert}
          sx={{ bgcolor: '#1b5e20', color: 'white', width: '100%' }}>
          You've Successfully Registered your Account
        </Alert>
      </Snackbar>
      <Snackbar open={registerFailedAlert} autoHideDuration={5000} onClose={closeRegisterFailedAlert}>
        <Alert severity='error' onClose={closeRegisterFailedAlert}
          sx={{ bgcolor: '#b71c1c', color: 'white', width: '100%' }}>
          Registration Failed. User ID has been Taken
        </Alert>
      </Snackbar>
      {/* Login Alert */}
      <Snackbar open={loginAlert} autoHideDuration={5000} onClose={closeLoginAlert}>
        <Alert severity='success' onClose={closeLoginAlert}
          sx={{ bgcolor: '#1b5e20', color: 'white', width: '100%' }}>
          You've Successfully Login to Your Account
        </Alert>
      </Snackbar>
      <Snackbar open={loginFailedAlert} autoHideDuration={5000} onClose={closeLoginFailedAlert}>
        <Alert severity='error' onClose={closeLoginFailedAlert}
          sx={{ bgcolor: '#b71c1c', color: 'white', width: '100%' }}>
          Login Failed. Incorrect Email or Password
        </Alert>
      </Snackbar>
      <Snackbar open={requireLoginAlert} autoHideDuration={3000} onClose={closeRequireLoginAlert}>
        <Alert severity='error' onClose={closeRequireLoginAlert}
          sx={{ bgcolor: '#b71c1c', color: 'white', width: '100%' }}>
          Login Required
        </Alert>
      </Snackbar>
    </Box>
  );
}