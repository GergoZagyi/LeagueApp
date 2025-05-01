'use client'; 

import { useState } from 'react'; 
import SearchBar from "./searchbar";

export default function Home() {
  const [summonerName, setSummonerName] = useState(''); 
  const [summonerTag, setSummonerTag] = useState('');

  const handleSearch = async (summonerName: string, summonerTag: string) => {
    setSummonerName(summonerName); 
    setSummonerTag(summonerTag);
    const response = await fetch(`http://localhost:3000/api/getSummonerData?summoner=${summonerName}&tag=${summonerTag}`)
    const data = await response.json();
    console.log("I am data coming from page.tsx", data);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8">League Profile Showcase</h1>
      <p className="text-center mt-4">Show off your League of Legends profile with style.</p>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
