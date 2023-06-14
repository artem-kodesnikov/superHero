import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteHero, getHeroById } from '../../api/requests';
import { Hero } from '../../types/hero.type';
import { HeroPageRow } from '../HeroPageRow/HeroPageRow';
import { ImageModal } from '../ImageModal/ImageModal';
import { previewImageBox } from '../NewHeroPage/NewHeroPage.style';
import { StyledHeroPageBackButton, StyledHeroPageBox, StyledHeroPageContainer, StyledHeroPagePaper, StyledHeroPageTitle, StyledImagesBox } from './HeroPage.style';
import { useNavigate } from 'react-router-dom';
import { UpdatingForm } from '../HeroPageUpdatingForm/UpdatingForm';
import { Loader } from '../Loader/Loader';
import { toast } from 'react-toastify';

export const HeroPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hero, setHero] = useState<Hero>();
  const [selectedImage, setSelectedImage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          return;
        }
        const data = await getHeroById(id);
        setHero(data.data);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, [isUpdating]);

  const handleDeleteHero = async () => {
    setIsLoading(true);
    try {
      if (id) {
        await deleteHero(id);
        toast.success('Hero deleted!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting hero:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <Link to='/'>
        <StyledHeroPageBackButton variant='contained'>
          Back to home page
        </StyledHeroPageBackButton>
      </Link>
      <StyledHeroPageContainer maxWidth='lg'>
        <StyledHeroPageBox>
          <StyledHeroPagePaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button onClick={handleDeleteHero} variant='contained' color='error'>Delete hero</Button>
              <Button onClick={() => setIsUpdating(!isUpdating)} sx={{ mr: 2 }} variant='contained' color='primary'>{isUpdating ? 'Cancel update' : 'Update info'}</Button>
            </Box>
            <StyledHeroPageTitle>
              Hero Page
            </StyledHeroPageTitle>
            {isUpdating ? (
              <UpdatingForm setIsUpdating={setIsUpdating} hero={hero} setSelectedImage={setSelectedImage} />
            ) : (
              <>
                <HeroPageRow title={'Nickname'} content={hero?.nickname} />
                <HeroPageRow title={'Real name'} content={hero?.real_name} />
                <HeroPageRow title={'Superpowers'} content={hero?.superpowers} />
                <HeroPageRow title={'Catch phrase'} content={hero?.catch_phrase} />
                <HeroPageRow title={'Origin description'} content={hero?.origin_description} />
                <StyledImagesBox>
                  {hero?.images.map((image) => (
                    <Box key={image._id} sx={previewImageBox}>
                      <img
                        onClick={() => setSelectedImage(image.url)}
                        src={image.url}
                        alt='hero images'
                      />
                    </Box>
                  ))}
                </StyledImagesBox>
              </>
            )}
          </StyledHeroPagePaper>
        </StyledHeroPageBox>
        <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      </StyledHeroPageContainer>
    </>
  );
};
