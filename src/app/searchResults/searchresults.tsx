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
                        const KDA : number = ((match.kills + match.assists) / match.deaths).toFixed(2);
                        const backgroundImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${match.champName}_0.jpg`;
                        
                        const handleClick = () => {
                            const scrollY = window.scrollY;

                            if (isFirst) {
                                setStartIndex((prevIndex) =>
                                prevIndex === 0 ? matchHistory.length - 3 : prevIndex - 1
                                );
                            } else if (isLast) {
                                setStartIndex((prevIndex) =>
                                prevIndex + 3 >= matchHistory.length ? 0 : prevIndex + 1
                                );
                            }

                            window.scrollTo({ top: scrollY });
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
                                <p className={match.win ? 'win' : 'lose'}>{match.win ? 'Victory' : 'Defeat'}</p>
                                <div className='search-results-item-details'>
                                    <div className='first-column'>
                                        <h3 className="first-column-row">{match.role}</h3>
                                        <h3 className={`first-column-row ${KDA > 6 ? 'high-kda' : ''} ${KDA < 3 ? 'low-kda' : ''} ${KDA > 3 && KDA < 6 ? 'average-kda' : ''}`}>{KDA} KDA</h3>
                                    </div>
                                    <div className='second-column'>
                                        <div id='grade'>
                                            <h3>S+</h3>
                                        </div>
                                        <div id='performance'>
                                            <div className="performance-row">
                                                <h5 className='performance-row-title'>Gold</h5>
                                                <h5>{match.goldEarned}</h5>
                                            </div>
                                            <div className="performance-row">
                                                <h5 className='performance-row-title'>Creep Score</h5>
                                                <h5>{match.totalMinionsKilled}</h5>
                                            </div>
                                            <div className="performance-row">
                                                <h5 className='performance-row-title'>Vision Score</h5>
                                                <h5>52</h5>
                                            </div>
                                            <div className="performance-row">
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