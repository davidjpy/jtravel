import React, { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  Button,
  Snackbar,
  Alert,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment'
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoAlbumRoundedIcon from '@mui/icons-material/PhotoAlbumRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveIcon from '@mui/icons-material/Save';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';


import axiosInstance from '../../utils/Axios';

const ThreadBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: '52%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
});

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const EditTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#263238',
    },
  }
});

const StyledCardContent = styled(CardContent)({
  '&:last-child': {
    paddingBottom: 6
  }
})

function Media({ auth, profileThread, profileThreadCounter, setProfileThreadCounter, tiggerer, setTiggerer, currentView, setCurrentView }) {

  const { username } = auth;

  const [focus, setFocus] = useState(currentView);
  const [deleteAlert, setDeleteAlert] = useState(false);


  const closedeleteAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setDeleteAlert(false);
  };

  const handleThreadView = () => {
    setCurrentView('thread');
  };

  const handleFavouriteView = () => {
    setCurrentView('favourite');
  };

  const handleBookmarkView = () => {
    setCurrentView('bookmark');
  };

  return (
    <StyledBox paddingTop={2}>
      <Divider sx={{ width: 912, borderBottomWidth: 2 }} />
      <BottomNavigation
        showLabels
        value={focus}
        onChange={(event, newValue) => { setFocus(newValue); }}>
        <BottomNavigationAction onClick={handleThreadView} value='thread' label="Threads" icon={<PhotoLibraryRoundedIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction onClick={handleFavouriteView} value='favourite' label="Favorites" icon={<FavoriteIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction onClick={handleBookmarkView} value='bookmark' label="Bookmarks" icon={<PhotoAlbumRoundedIcon />} />
      </BottomNavigation>
      <ImageList cols={3} rowHeight='auto' sx={{ mt: 2, width: 920, paddingBottom: 5, overflow: 'unset' }}>
        {profileThread.map((item) => (
          <ThreadItem
            key={item.image}
            authUsername={username}
            profileThreadCounter={profileThreadCounter}
            setProfileThreadCounter={setProfileThreadCounter}
            tiggerer={tiggerer}
            setTiggerer={setTiggerer}
            setDeleteAlert={setDeleteAlert}
            currentView={currentView}
            {...item} />
        ))}
      </ImageList>
      <Snackbar open={deleteAlert} autoHideDuration={2000} onClose={closedeleteAlert}>
        <Alert onClose={closedeleteAlert} severity='error'
          sx={{ bgcolor: '#b71c1c', color: 'white', width: '100%' }}>
          You've Successfully Deleted this Thread
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default Media;

function ThreadItem({ authUsername, id, image, alt, username, username_display, profile_image, content, created, liked,
  bookmarked, profileThreadCounter, setProfileThreadCounter, tiggerer, setTiggerer, setDeleteAlert, currentView }) {

  const [like, setLike] = useState(liked.indexOf(authUsername) > -1);
  const [likeAlert, setLikeAlert] = useState(false);
  const [unlikeAlert, setUnlikeAlert] = useState(false);
  const [bookmark, setBookmark] = useState(bookmarked.indexOf(authUsername) > -1);
  const [bookmarkAlert, setBookmarkAlert] = useState(false);
  const [unBookmarkAlert, setUnBookmarkAlert] = useState(false);
  const [hover, setHover] = useState(false);
  const [openThread, setOpenThread] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editField, setEditField] = useState(content)
  const [updateAlert, setUpdateAlert] = useState(false);
  const openActionMenu = Boolean(anchorEl);

  const handleAddFavourite = async () => {
    await axiosInstance.post(`api/public/favourite/${id}/`, null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    if (!like) {
      setLikeAlert(true);
      renderEdit(tiggerer);
    }
    else {
      setUnlikeAlert(true);
      renderEdit(tiggerer);
    }
  };

  const handleAddBookmark = async () => {
    await axiosInstance.post(`api/public/bookmark/${id}/`, null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    if (!bookmark) {
      setBookmarkAlert(true);
      renderEdit(tiggerer);
    }
    else {
      setUnBookmarkAlert(true);
      renderEdit(tiggerer);
    }
  };

  const toggleLikeButton = (event) => {
    setLike(event.target.checked);
    handleAddFavourite();
  };

  const closeLikeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setLikeAlert(false);
  };

  const closeUnlikeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setUnlikeAlert(false);
  };

  const toggleBookmarkButton = (event) => {
    setBookmark(event.target.checked);
    handleAddBookmark();
  };

  const closeBookmarkAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setBookmarkAlert(false);
  };

  const closeUnBookmarkAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setUnBookmarkAlert(false);
  };

  const closeupdateAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setUpdateAlert(false);
  };

  const toggleThreadWindow = () => {
    setOpenThread(!openThread);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderEdit = (e) => {
    setTiggerer(e + 1)
  };

  const closeActionMenu = () => {
    setAnchorEl(null);
  };

  const handleThreadUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('alt', editField);
      formData.append('content', editField);
      formData.append('created', moment().format('YYYY-MM-DDThh:mm:ss'));
      await axiosInstance.put(`api/public/thread/${id}/`, formData, {
        headers:
        {
          'content-type': 'multipart/form-data'
        }
      });
      renderEdit(tiggerer);
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal open={openThread} onClose={() => { toggleThreadWindow(); setIsEditMode(false); }} aria-labelledby='thread-details' aria-describedby='thread-action'
        disableAutoFocus closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openThread}>
          <ThreadBox>
            <Card sx={{ borderRadius: '16px', height: 'auto', width: 600 }}>
              <CardHeader
                titleTypographyProps={{ fontSize: 18 }}
                avatar={<Avatar src={profile_image}
                  sx={{ height: 45, width: 45 }} />}
                action={isEditMode || currentView !== 'thread' ? null: <IconButton aria-label='actions' onClick={toggleActionMenu} ><MoreVertIcon size="small"
                  aria-controls={openActionMenu ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openActionMenu ? 'true' : undefined} /></IconButton>}
                title={username_display}
                subheader={created} />
                <ActionMenu
                  anchorEl={anchorEl}
                  openActionMenu={openActionMenu}
                  closeActionMenu={closeActionMenu}
                  toggleThreadWindow={toggleThreadWindow}
                  profileThreadCounter={profileThreadCounter}
                  setProfileThreadCounter={setProfileThreadCounter}
                  id={id}
                  toggleEditMode={toggleEditMode}
                  setDeleteAlert={setDeleteAlert} />
              <CardMedia component='img' image={image} height='auto' />
              {isEditMode ? (
                <>
                  <StyledCardContent>
                    <EditTextField name='Edit' label='Edit' variant='outlined' placeholder='Make your changes here......'
                      onChange={e => setEditField(e.target.value)} defaultValue={content} multiline rows={3}
                      sx={{ width: '100%' }} InputProps={{ style: { fontSize: 14 } }} />
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                      <Button variant='contained' onClick={async () => { await handleThreadUpdate(); toggleEditMode(); setUpdateAlert(true); }}
                        startIcon={<SaveIcon />} sx={{ width: 116 }}>Save</Button>
                      <Button variant='contained' color='inherit' onClick={toggleEditMode}
                        startIcon={<CancelRoundedIcon />} sx={{ width: 116 }}>Cancel</Button>
                    </CardActions>
                  </StyledCardContent>
                </>
              ) : (
                <>
                  <CardActions disableSpacing sx={{ paddingBottom: 0 }}>
                    {currentView !== 'thread' &&
                      <>
                        <Checkbox checked={like} onChange={toggleLikeButton}
                          icon={<FavoriteBorder />}
                          checkedIcon={<FavoriteIcon sx={{ color: '#b71c1c' }} />} />
                        {liked.length > 0 &&
                          <>
                            <Typography variant='subtitle2' sx={{ mr: 0.5 }}>Liked by</Typography>
                            <Typography variant='subtitle2' sx={{ mr: 0.5, color: '#2979ff' }}>{liked[0]}</Typography>
                            <Typography variant='subtitle2' sx={{ mr: 0.5 }}>{liked.length > 1 && 'and'}</Typography>
                            <Typography variant='subtitle2' sx={{ color: '#2979ff' }}>{liked.length > 1 && `other ${liked.length - 1} ${liked.length > 2 ? 'users' : 'user'}`} </Typography>
                          </>
                        }
                        <Checkbox checked={bookmark} onChange={toggleBookmarkButton}
                          icon={<BookmarkBorderOutlinedIcon />}
                          checkedIcon={<BookmarkRoundedIcon sx={{ color: '#37474f' }} />}
                          sx={{ ml: 'auto' }} />
                      </>
                    }
                  </CardActions>
                  <CardContent>
                    <Typography variant='body1'>
                      {content}
                    </Typography>
                  </CardContent>
                </>
              )}
            </Card>
          </ThreadBox>
        </Fade>
      </Modal>
      <ImageListItem sx={{ padding: 0.5 }}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onMouseOver={() => { setHover(true) }}
          onMouseOut={() => { setHover(false) }}
          onClick={toggleThreadWindow}
          style={
            hover ? {
              zIndex: 1,
              transform: 'scale(1.1, 1.1)',
              boxShadow: '20px 20px 15px -4px #000000',
              transition: '0.5s',
              opacity: 0.85,
              cursor: 'pointer'
            } : {
              transition: '0.5s',
            }
          }
        />
      </ImageListItem>
      <Snackbar open={updateAlert} autoHideDuration={2000} onClose={closeupdateAlert}>
        <Alert onClose={closeupdateAlert} severity='success'
          sx={{ bgcolor: '#1b5e20', color: 'white', width: '100%' }}>
          You've Successfully Updated this Thread
        </Alert>
      </Snackbar>
      <Snackbar open={likeAlert} autoHideDuration={2000} onClose={closeLikeAlert}>
        <Alert onClose={closeLikeAlert} sx={{ color: 'white', bgcolor: '#b71c1c', width: '100%' }}>
          You've Liked this Thread
        </Alert>
      </Snackbar>
      <Snackbar open={unlikeAlert} autoHideDuration={2000} onClose={closeUnlikeAlert}>
        <Alert onClose={closeUnlikeAlert} sx={{ color: 'white', bgcolor: '#795548', width: '100%' }}>
          You've Unliked this Thread
        </Alert>
      </Snackbar>
      <Snackbar open={bookmarkAlert} autoHideDuration={2000} onClose={closeBookmarkAlert}>
        <Alert onClose={closeBookmarkAlert} sx={{ color: 'white', bgcolor: '#37474f', width: '100%' }}>
          You've Bookmarked this Thread
        </Alert>
      </Snackbar>
      <Snackbar open={unBookmarkAlert} autoHideDuration={2000} onClose={closeUnBookmarkAlert}>
        <Alert onClose={closeUnBookmarkAlert} sx={{ color: 'white', bgcolor: '#795548', width: '100%' }}>
          You've Unbookmarked this Thread
        </Alert>
      </Snackbar>
    </>
  );
};

function ActionMenu({ id, toggleThreadWindow, anchorEl, openActionMenu, closeActionMenu,
  profileThreadCounter, setProfileThreadCounter, toggleEditMode, setDeleteAlert }) {

  const deleteThread = async () => {
    await axiosInstance.delete(`api/public/thread/${id}`);
    updateProfileThreadCounter(profileThreadCounter);
    setDeleteAlert(true);
  };

  const updateProfileThreadCounter = (e) => {
    setProfileThreadCounter(e - 1);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id='action-menu'
        open={openActionMenu}
        onClose={closeActionMenu}
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
        <MenuItem onClick={() => { toggleEditMode(); closeActionMenu(); }}
          sx={{ width: 130 }}>
          <ListItemIcon >
            <CreateRoundedIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={async () => { await deleteThread(); toggleThreadWindow(); }}>
          <ListItemIcon>
            <DeleteRoundedIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

