import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const HeroCard = () => {
  return (
    <Card sx={{ minWidth: 345, mb: 5 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://i.scdn.co/image/ab67616d0000b2733bca70eb1b6154673ea8b199"
      />
      <CardContent>
        <Typography textAlign={'center'} gutterBottom variant="h5" component="div">
          TITLE
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='contained' color='primary' size="medium">Learn More</Button>
      </CardActions>
    </Card>
  );
}