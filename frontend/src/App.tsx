import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HeroPage } from './components/HeroPage/HeroPage';
import { HomePage } from './components/HomePage/HomePage';
import { NewHeroPage } from './components/NewHeroPage/NewHeroPage';

export const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        index
        element={<HomePage />}
      />
      <Route
        path='/hero/:id'
        element={<HeroPage />}
      />
      <Route
        path='/createHero'
        element={<NewHeroPage />}
      />
    </Routes>
  );
}
