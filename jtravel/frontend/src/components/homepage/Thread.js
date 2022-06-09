import React, { useState, forwardRef, useEffect } from 'react'
import {
  Box,
  Snackbar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Checkbox,
  Button
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import moment from 'moment'

import axiosInstance from '../../utils/Axios';

// import faker from  'faker';

function Thread({ auth, thread, threadCounter, setThreadCounter }) {

  const { username } = auth;

  return (
    <Box paddingTop={8} flex={2} sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
      {thread.map((item) => (
        <ThreadItem 
          key={item.image} 
          authUsername={username} 
          threadCounter={threadCounter}
          setThreadCounter={setThreadCounter}
          {...item} />
      ))}
    </Box>
  );
};

export default Thread;

function ThreadItem({ authUsername, id, username, username_display, profile_image, content, image, liked, created, threadCounter, setThreadCounter }) {

  const [like, setLike] = useState(liked.indexOf(authUsername) > -1 && true);
  const [likeAlert, setLikeAlert] = useState(false);
  const [unlikeAlert, setUnlikeAlert] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkAlert, setBookmarkAlert] = useState(false);
  const [unBookmarkAlert, setUnBookmarkAlert] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  });

  const handleUpdate = (e) => {
    setThreadCounter(e + 1);
  };

  const handleAddFavourite = async () => {
    await axiosInstance.post(`api/public/favourites/${id}/`, null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    if (!like) {
      setLikeAlert(true);
      handleUpdate(threadCounter);
    }
    else {
      setUnlikeAlert(true);
      handleUpdate(threadCounter);
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
    event.target.checked ? setBookmarkAlert(true) : setUnBookmarkAlert(true)
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

  const logger = () => {
    console.log(liked)
  }

  return (
    <>
      <Card sx={{ margin: 3, borderRadius: '16px' }}>
        <CardHeader
          titleTypographyProps={{ fontSize: 18 }}
          avatar={<Avatar src={profile_image} aria-label={username}
            sx={{ height: 50, width: 50 }} />}
          action={<IconButton aria-label='settings'><MoreVertIcon /></IconButton>}
          title={username_display}
          subheader={created} />
        <CardMedia component='img' image={image} height='auto' />
        <CardActions disableSpacing sx={{ paddingBottom: 0 }}>
          <Checkbox checked={like} onChange={toggleLikeButton}
            icon={<FavoriteBorder />}
            checkedIcon={<FavoriteIcon sx={{ color: '#b71c1c' }} />} />
          {liked.length > 0 && 
          <>
            <Typography variant='subtitle2' sx={{ mr: 0.5 }}>Liked by</Typography>
            <Typography variant='subtitle2' sx={{ mr: 0.5, color: '#2979ff'}}>{liked[0]}</Typography>
            <Typography variant='subtitle2'sx={{ mr: 0.5 }}>{liked.length > 1 && 'and'}</Typography>
            <Typography variant='subtitle2' sx={{ color: '#2979ff' }}>{liked.length > 1 && `other ${liked.length - 1} ${liked.length > 2 ? 'users' : 'user'}`} </Typography>
          </>
          }
          <Checkbox checked={bookmark} onChange={toggleBookmarkButton}
            icon={<BookmarkBorderOutlinedIcon />}
            checkedIcon={<BookmarkRoundedIcon sx={{ color: '#37474f' }} />} 
            sx={{ ml: 'auto' }} />
          <IconButton onClick={logger}>
            <ShareIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography variant='body1'>
            {content}
          </Typography>
        </CardContent>
        <Snackbar open={likeAlert} autoHideDuration={2000} onClose={closeLikeAlert}>
          <Alert onClose={closeLikeAlert} sx={{ bgcolor: '#b71c1c', width: 300 }}>
            You've Liked this Thread
          </Alert>
        </Snackbar>
        <Snackbar open={unlikeAlert} autoHideDuration={2000} onClose={closeUnlikeAlert}>
          <Alert onClose={closeUnlikeAlert} sx={{ bgcolor: '#795548', width: 300 }}>
            You've Unliked this Thread
          </Alert>
        </Snackbar>
        <Snackbar open={bookmarkAlert} autoHideDuration={2000} onClose={closeBookmarkAlert}>
          <Alert onClose={closeBookmarkAlert} sx={{ bgcolor: '#37474f', width: 300 }}>
            You've Bookmarked this Thread
          </Alert>
        </Snackbar>
        <Snackbar open={unBookmarkAlert} autoHideDuration={2000} onClose={closeUnBookmarkAlert}>
          <Alert onClose={closeUnBookmarkAlert} sx={{ bgcolor: '#795548', width: 300 }}>
            You've Unbookmarked this Thread
          </Alert>
        </Snackbar>
      </Card>
    </>
  )
};