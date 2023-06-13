import React from 'react';
import { Container } from '@mui/material';
import { HeroCard } from './components/HeroCard';
import { Header } from './components/Header';

function App() {
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

export default App;
