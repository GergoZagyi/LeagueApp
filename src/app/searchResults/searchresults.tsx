'use client';
import { useState, useRef } from 'react';
import './searchresults.css';
import { motion, AnimatePresence } from 'framer-motion';

type MatchHistoryProps = {
  matchHistory: any[];
};

export default function MatchHistory({ matchHistory }: MatchHistoryProps) {
  const [middleIndex, setMiddleIndex] = useState(0); // focus is always middle
  const containerRef = useRef<HTMLDivElement>(null);

  const total = matchHistory.length;

  const getWrappedIndex = (index: number) => {
    return (index + total) % total;
  };

  const visibleMatches = [
    matchHistory[getWrappedIndex(middleIndex - 1)],
    matchHistory[getWrappedIndex(middleIndex)],
    matchHistory[getWrappedIndex(middleIndex + 1)],
  ];

  const handleClick = (direction: 'prev' | 'next') => {
    const scrollY = window.scrollY;
    setMiddleIndex((prev) =>
      direction === 'prev'
        ? getWrappedIndex(prev - 1)
        : getWrappedIndex(prev + 1)
    );
    window.scrollTo({ top: scrollY });
  };

  return (
    <div className='search-results-wrapper'>
      <div className='search-results' ref={containerRef}>
        <h1>Match History</h1>
        <AnimatePresence mode='popLayout'>
          {visibleMatches.map((match, index) => {
            const isMiddle = index === 1;
            const isFirst = index === 0;
            const isLast = index === 2;
            const KDA: number = +((match.kills + match.assists) / match.deaths).toFixed(2);

            const backgroundImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${match.champName}_0.jpg`;

            return (
              <motion.div
                key={`${middleIndex}-${index}-${match.gameId}`}
                layout
                transition={{ layout: { duration: 0.5, ease: 'easeInOut' } }}
                className={`search-results-item ${!isMiddle ? 'side-item' : ''}`}
                onClick={
                  isFirst
                    ? () => handleClick('prev')
                    : isLast
                    ? () => handleClick('next')
                    : undefined
                }
                style={{
                  cursor: !isMiddle ? 'pointer' : 'default',
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${backgroundImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  position: 'relative',
                }}
              >
                <h2>{match.champName}</h2>
                <p className={match.win ? 'win' : 'lose'}>
                  {match.win ? 'Victory' : 'Defeat'}
                </p>
                <div className='search-results-item-details'>
                  <div className='first-column'>
                    <h3 className='first-column-row'>{match.role}</h3>
                    <h3
                      className={`first-column-row example ${
                        KDA > 6
                          ? 'high-kda'
                          : KDA < 3
                          ? 'low-kda'
                          : 'average-kda'
                      }`}
                    >
                      {KDA} KDA
                    </h3>
                  </div>
                  <div className='second-column'>
                    <div id='grade'>
                      <h3>S+</h3>
                    </div>
                    <div id='performance'>
                      <div className='performance-row'>
                        <h5 className='performance-row-title'>Gold</h5>
                        <h5>{match.goldEarned}</h5>
                      </div>
                      <div className='performance-row'>
                        <h5 className='performance-row-title'>Creep Score</h5>
                        <h5>{match.totalMinionsKilled}</h5>
                      </div>
                      <div className='performance-row'>
                        <h5 className='performance-row-title'>Vision Score</h5>
                        <h5>52</h5>
                      </div>
                      <div className='performance-row'>
                        <h5 className='performance-row-title'>Something else</h5>
                        <h5>78</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
