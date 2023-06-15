import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Hero } from '../../types/hero.type';
import { Link } from 'react-router-dom';
import { HeroCardActions, HeroCardImage, HeroCards } from './HeroCard.style';

interface Props extends Hero {
  _id: string,
  handleDelete: (id: string) => void
}

export const HeroCard: React.FC<Props> = ({ _id, nickname, images, handleDelete }) => {
  return (
    <Card sx={HeroCards}>
      <CardMedia
        sx={HeroCardImage}
        image={images.length > 0 ? images[0].url : './image_not_found.svg'}
      />
      <CardContent>
        <Typography textAlign={'center'} gutterBottom variant="h5" component="div">
          Nickname:
          <br />
          {nickname}
        </Typography>
      </CardContent>
      <CardActions sx={HeroCardActions}>
        <Link to={`hero/${_id}`}>
          <Button sx={{ mr: 2 }} variant='contained' color='primary' size="medium">Open details</Button>
        </Link>
        <Button onClick={() => handleDelete(_id)} variant='contained' color='error' size="medium">Delete hero</Button>
      </CardActions>
    </Card>
  );
};
