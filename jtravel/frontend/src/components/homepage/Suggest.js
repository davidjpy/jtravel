import * as React from 'react';
import { Box, Typography, ImageList, ImageListItem, ImageListItemBar, IconButton, Divider, Card, CardHeader, CardMedia, CardContent } from '@mui/material';
import { Gallery } from './SuggestData'
import { useTheme, styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ablum from '../../assets/images/album.jpg'

const Container = styled(Box) ({
  display: 'flex', 
  position: 'sticky', 
  alignSelf: 'flex-start', 
  flexDirection: 'column', 
  alignItems: 'flex-end',
  top: 0, 
})

function Suggest() {

  const theme = useTheme();

  return (
    <Container paddingTop={10} flex={2}>
      <Box sx={{ mt: 1, mr: 2 }}>
        {/* Gallery */}
        <Divider textAlign='left' sx={{ mb: 1, color: '#37474f' }}>
          <Typography variant='h6' sx={{ color: '#37474f' }}>
            Featured Gallery
          </Typography>
        </Divider>
        <ImageList sx={{ width: 400, height: 500, borderRadius: '16px' }}>
          {Gallery.map((item, index) => {
            return (
              <ImageListItem key={index}>
                <img src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy" />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            )
          })}
        </ImageList>
        {/* J-Pop Music */}
        <Divider textAlign='left' sx={{ mt: 3, mb: 1, color: '#37474f' }}>
          <Typography variant='h6' sx={{ color: '#37474f' }}>
            Hot J-Pop Music
          </Typography>
        </Divider>
        <Card sx={{ display: 'flex', borderRadius: '16px', width: 400 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                Pale Blue
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                よねづけんし Yonezu Kenshi
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton>
            </Box>
          </Box>
          <CardMedia component="img" image={ablum} sx={{ width: 151, ml: 'auto' }} alt="Live from space album cover" />
        </Card>
      </Box>
    </Container>
  )
}

export default Suggest;


