import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
        // element={<HeroCard />}
      />
      <Route
        path='/createHero'
        element={<NewHeroPage />}
      />
    </Routes>
  );
}
