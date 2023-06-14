import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteHero, getHeroes } from '../../api/requests';
import { Hero } from '../../types/hero.type';
import { HeroCard } from '../HeroCard/HeroCard';
import { Loader } from '../Loader/Loader';

export const HeroesList = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getHeroes();
        setHeroes(data.data);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteHero(id);
      toast.success('Hero deleted!');
      setHeroes(prevHeroes => prevHeroes.filter(hero => hero._id !== id));
    } catch (error) {
      console.error('Error deleting hero:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Loader isLoading={isLoading} />
      {heroes.map((hero) =>
        <HeroCard handleDelete={handleDelete} key={hero._id} {...hero} />
      )}
    </div>
  );
};
