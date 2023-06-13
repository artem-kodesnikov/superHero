import React from 'react';
import { Container } from '@mui/material';
import { Header } from '../Header/Header';
import { HeroesList } from '../HeroesList/HeroesList';
import { HomePageContainer } from './HomePage.style';

export const HomePage = () => {

  return (
    <>
      <Header />
      <Container sx={HomePageContainer} maxWidth="sm">
        <HeroesList />
      </Container>
    </>
  );
}
