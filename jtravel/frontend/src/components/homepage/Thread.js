import React, { useState, forwardRef, useEffect } from 'react'
import { Box, Snackbar, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, List, ListItem, ListItemAvatar, ListItemText, Divider, Checkbox } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';

import useAxiosFetch from '../../hooks/useAxiosFetch';

// import faker from  'faker';

function Thread() {

  const { data } = useAxiosFetch('http://127.0.0.1:8000/api/public/thread/');

  useEffect(() => {
    setThread(data);
  }, [data])

  const [thread, setThread] = useState([])
  const [like, setLike] = useState(false);
  const [likeAlert, setLikeAlert] = useState(false);
  const [unlikeAlert, setUnlikeAlert] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkAlert, setBookmarkAlert] = useState(false);
  const [unBookmarkAlert, setUnBookmarkAlert] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  });

  const toggleLikeButton = (event) => {
    setLike(event.target.checked);
    event.target.checked ? setLikeAlert(true) : setUnlikeAlert(true)
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

  return (
    <Box paddingTop={8} flex={2} sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
      {thread.map((item, index) => {
        return ( 
          <Card key={index} sx={{ margin: 3, borderRadius: '16px' }}>
            <CardHeader
              titleTypographyProps={{ fontSize: 18 }}
              avatar={<Avatar src={item.profile_image} aria-label={item.username} 
                sx={{ height: 50, width: 50 }} />}
              action={<IconButton aria-label='settings'><MoreVertIcon /></IconButton>}
              title={item.username}
              subheader={item.created} />
            <CardMedia component='img' image={item.image} height='auto' />
            <CardContent>
              <Typography variant='body2'>
                {item.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label='add to favorites'>
                <Checkbox checked={like} onChange={toggleLikeButton}
                  icon={<FavoriteBorder />}
                  checkedIcon={<FavoriteIcon sx={{ color: '#b71c1c' }} />} />
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>
              <IconButton sx={{ ml: 'auto' }}>
                <Checkbox checked={bookmark} onChange={toggleBookmarkButton}
                  icon={<BookmarkBorderOutlinedIcon />}
                  checkedIcon={<BookmarkRoundedIcon sx={{ color: '#37474f' }} />} />
              </IconButton>
            </CardActions>
            {/* Alert */}
            <Snackbar open={likeAlert} autoHideDuration={2000} onClose={closeLikeAlert}>
              <Alert onClose={closeLikeAlert} sx={{ bgcolor: '#b71c1c', width: 300 }}>
                You've Liked this Post
              </Alert>
            </Snackbar>
            <Snackbar open={unlikeAlert} autoHideDuration={2000} onClose={closeUnlikeAlert}>
              <Alert onClose={closeUnlikeAlert} sx={{ bgcolor: '#795548', width: 300 }}>
                You've Unliked this Post
              </Alert>
            </Snackbar>
            <Snackbar open={bookmarkAlert} autoHideDuration={2000} onClose={closeBookmarkAlert}>
              <Alert onClose={closeBookmarkAlert} sx={{ bgcolor: '#37474f', width: 300 }}>
                You've Bookmarked this Post
              </Alert>
            </Snackbar>
            <Snackbar open={unBookmarkAlert} autoHideDuration={2000} onClose={closeUnBookmarkAlert}>
              <Alert onClose={closeUnBookmarkAlert} sx={{ bgcolor: '#795548', width: 300 }}>
                You've Unbookmarked this Post
              </Alert>
            </Snackbar>
          </Card>
        )
      })}
    </Box>
  )
}

export default Thread;