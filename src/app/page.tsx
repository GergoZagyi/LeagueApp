'use client';
import "./global.css"
import { useState } from 'react'; 
import SearchBar from "./searchbar";
import SearchResults from "./searchResults/searchresults";

export default function Home() {
  const [matchHistoryOpen, setMatchHistoryOpen] = useState(false);
  const [summonerName, setSummonerName] = useState(''); 
  const [summonerTag, setSummonerTag] = useState('');
  const [puuid, setPuuid] = useState('');
  const [matchHistory, setMatchHistory] = useState([]); 

  const handleSearch = async (summonerName: string, summonerTag: string) => {
    setSummonerName(summonerName); 
    setSummonerTag(summonerTag);
    const response = await fetch(`http://localhost:3000/api/getSummonerData?summoner=${summonerName}&tag=${summonerTag}`);
    const data = await response.json();
    console.log("Coming from search call", data);
    setPuuid(data.puuid);
    setMatchHistory(data);
    setMatchHistoryOpen(true);
  };


  return (
    <div className='home-container'>
      <h1>League Profile Showcase</h1>
      <p>Search for your summoner name and tag to get your profile and history!</p>
      <SearchBar onSearch={handleSearch} />
      <SearchResults  matchHistory={matchHistory}/> 
    </div>
  );
}
