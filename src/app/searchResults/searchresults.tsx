'use client'
import { useState, useRef } from 'react';
import './searchresults.css';
import { motion, AnimatePresence } from 'framer-motion';

type MatchHistoryProps = {
    matchHistory: any[]; 
};

export default function MatchHistory({ matchHistory }: MatchHistoryProps) {
    const [startIndex, setStartIndex] = useState(0);
    const visibleMatches = matchHistory.slice(startIndex, startIndex + 3);
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        
        <div className='search-results-wrapper'>
                <div className='search-results' ref={containerRef}>
                    <h1>Match History</h1>
                    <AnimatePresence mode="popLayout">
                    {visibleMatches.map((match, index) => {
                        const isFirst = index === 0;
                        const isLast = index === visibleMatches.length - 1;
                        
                        const backgroundImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${match.champName}_0.jpg`;

                        const handleClick = () => {
                            if (containerRef.current) {
                                const scrollY = window.scrollY;
                                
                                if (isFirst && startIndex > 0) {
                                    setStartIndex(startIndex - 1);
                                } else if (isLast && startIndex + 3 < matchHistory.length) {
                                    setStartIndex(startIndex + 1);
                                }
                                window.scrollTo({ top: scrollY });
                            }
                        };
                        return (
                            <motion.div
                                key={startIndex + index}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3 }}
                                className={`search-results-item ${isFirst || isLast  ? 'side-item' : ''}`}
                                onClick={isFirst || isLast ? handleClick : undefined}
                                style={{
                                    cursor: isFirst || isLast ? 'pointer' : 'default',
                                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${backgroundImageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: 'white',
                                    position: 'relative'
                                }}

                            >
                                <h2>{match.champName}</h2>
                                <p className={match.win ? 'win' : 'lose'}>{match.win ? 'Win' : 'Lose'}</p>
                                <div className='search-results-item-details'>
                                    <div className='first-row'>
                                        <p>KDA {match.kills}/{match.deaths}/{match.assists}</p>
                                        <p>Gold: {match.goldEarned}</p>
                                        <p>CS: {match.totalMinionsKilled}</p>
                                    </div>
                                    <div className='second-row'>
                                        <p>Role: {match.role}</p>
                                        <p>Duration: {Math.floor(match.gameDuration / 60)}:{match.gameDuration % 60}</p>
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