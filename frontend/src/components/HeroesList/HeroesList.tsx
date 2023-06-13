import React, { useEffect, useState } from 'react'
import { getHeroes } from '../../api/requests';
import { Hero } from '../../types/hero.type';
import { HeroCard } from '../HeroCard/HeroCard'

export const HeroesList = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHeroes()
      setHeroes(data.data);
    }
    fetchData()
  }, [])

  console.log(heroes);
  return (
    <div>
      {heroes.map((hero) =>
        <HeroCard key={hero._id} {...hero} />
      )}
    </div>
  )
}
