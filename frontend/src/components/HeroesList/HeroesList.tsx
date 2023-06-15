import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteHero, getHeroes } from '../../api/requests';
import { Hero } from '../../types/hero.type';
import { HeroCard } from '../HeroCard/HeroCard';
import { HeroPagination } from '../HeroPagination/HeroPagination';
import { Loader } from '../Loader/Loader';

export const HeroesList = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getHeroes(currentPage);
        const totalPages = Math.ceil(data.data.totalHeroes / 5);
        setTotalPages(totalPages);
        setHeroes(data.data.posts);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

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
      <HeroPagination
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};
