import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Hero } from '../../types/hero.type';
import { Link } from 'react-router-dom';

interface Props extends Hero {
  _id: string,
}

export const HeroCard: React.FC<Props> = ({ _id, nickname, real_name, origin_description, superpowers, catch_phrase, images }) => {
  console.log(_id)
  return (
    <Card sx={{ minWidth: 345, mb: 5 }}>
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain' }}
        image={images.length > 0 ? images[0].url : './image_not_found.svg'}
      />
      <CardContent>
        <Typography textAlign={'center'} gutterBottom variant="h5" component="div">
          Nickname:
          <br />
          {nickname}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to={`hero/${_id}`}>
          <Button variant='contained' color='primary' size="medium">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}