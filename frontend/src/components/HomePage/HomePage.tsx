import React from 'react';
import { Container } from '@mui/material';
import { Header } from '../Header/Header';
import { HeroCard } from '../HeroCard/HeroCard';

export const HomePage = () => {
  return (
    <>
      <Header />
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 5 }} maxWidth="sm">
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
      </Container>
    </>
  );
}
