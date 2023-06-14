import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { deleteHero, getHeroById } from '../../api/requests';
import { Hero } from '../../types/hero.type';
import { HeroPageRow } from '../HeroPageRow/HeroPageRow';
import { ImageModal } from '../ImageModal/ImageModal';
import { StyledBackDrop } from '../NewHeroPage/NewHeroPage.style';
import { StyledHeroPageBackButton, StyledHeroPageBox, StyledHeroPageContainer, StyledHeroPagePaper, StyledHeroPageTitle, StyledImagesBox } from './HeroPage.style';
import { useNavigate } from "react-router-dom";
import { UpdatingForm } from '../HeroPageUpdatingForm/UpdatingForm';

export const HeroPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hero, setHero] = useState<Hero>();
  const [selectedImage, setSelectedImage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      setIsLoading(true)
      try {
        if (!id) {
          return;
        }
        const data = await getHeroById(id);
        setHero(data.data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchHero()
  }, [])

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      if (id) {
        await deleteHero(id);
        navigate('/');
      }
    } catch (error) {
      console.error("Error deleting hero:", error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <StyledBackDrop open={isLoading}>
        <CircularProgress color="inherit" />
      </StyledBackDrop>
      <Link to='/'>
        <StyledHeroPageBackButton variant='contained'>
          Back to home page
        </StyledHeroPageBackButton>
      </Link>
      <StyledHeroPageContainer maxWidth="lg">
        <StyledHeroPageBox>
          <StyledHeroPagePaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button onClick={handleDelete} variant='contained' color='error'>Delete hero</Button>
              <Button onClick={() => setIsUpdating(!isUpdating)} sx={{ mr: 2 }} variant='contained' color='primary'>{isUpdating ? 'Cancel update' : 'Update info'}</Button>
            </Box>
            <StyledHeroPageTitle>
              Hero Page
            </StyledHeroPageTitle>
            {isUpdating ? (
              <UpdatingForm hero={hero} setSelectedImage={setSelectedImage} />
            ) : (
              <>
                <HeroPageRow title={'Nickname'} content={hero?.nickname} />
                <HeroPageRow title={'Real name'} content={hero?.real_name} />
                <HeroPageRow title={'Superpowers'} content={hero?.superpowers} />
                <HeroPageRow title={'Catch phrase'} content={hero?.catch_phrase} />
                <HeroPageRow title={'Origin description'} content={hero?.origin_description} />
                <StyledImagesBox>
                  {hero?.images.map((image) => (
                    <img
                      onClick={() => setSelectedImage(image.url)}
                      src={image.url}
                      alt='hero images'
                      key={image.url}
                    />
                  ))}
                </StyledImagesBox>
              </>
            )}
          </StyledHeroPagePaper>
        </StyledHeroPageBox>
        <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      </StyledHeroPageContainer>
    </>
  )
}
