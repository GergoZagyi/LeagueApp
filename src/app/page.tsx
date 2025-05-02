'use client'; 

import { useState } from 'react'; 
import SearchBar from "./searchbar";
import SearchResults from "./searchResults/searchresults"
export default function Home() {
  const [summonerName, setSummonerName] = useState(''); 
  const [summonerTag, setSummonerTag] = useState('');
  const [puuid, setPuuid] = useState('');



  const handleSearch = async (summonerName: string, summonerTag: string) => {
    setSummonerName(summonerName); 
    setSummonerTag(summonerTag);
    const response = await fetch(`http://localhost:3000/api/getSummonerData?summoner=${summonerName}&tag=${summonerTag}`)
    const data = await response.json();
    console.log(data);
    setPuuid(data.puuid);
  };
  const showData = async () => {
    console.log("I am puuid", puuid);
    console.log("I am summonerName", summonerName);
    console.log("I am summonerTag", summonerTag);
  }


  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8">League Profile Showcase</h1>
      <p className="text-center mt-4">Show off your League of Legends profile with style.</p>
      <SearchBar onSearch={handleSearch} />
      <SearchResults puuid={puuid} />
      <button onClick={showData}>FOR LOGGING</button>
    </div>
  );
}
