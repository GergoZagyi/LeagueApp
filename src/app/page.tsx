'use client';
import "./global.css"
import { useState } from 'react'; 
import SearchBar from "./searchbar";
import SearchResults from "./searchResults/searchresults";
import Profile from "./profileResults/profile"

export default function Home() {
  const [summonerName, setSummonerName] = useState(''); 
  const [summonerTag, setSummonerTag] = useState('');
  const [puuid, setPuuid] = useState('');

  const [matchHistoryOpen, setMatchHistoryOpen] = useState(false);
  const [matchHistory, setMatchHistory] = useState([]); 

  const [profileDataArray, setProfileDataArray] = useState([]);

  const handleSearch = async (summonerName: string, summonerTag: string) => {

    /* general setting tags for fetches */
    setSummonerName(summonerName); 
    setSummonerTag(summonerTag);
    
    /* matchhistory part */
    const response = await fetch(`http://localhost:3000/api/getSummonerData?summoner=${summonerName}&tag=${summonerTag}`);
    const data = await response.json();
    console.log("Coming from search call", data);
    setPuuid(data.puuid);
    setMatchHistory(data);
    setMatchHistoryOpen(true);

    /* bundled Data */
    const profileResponse = await fetch(`http://localhost:3000/api/getBundledData?summoner=${summonerName}&tag=${summonerTag}`);
    const profileData = await profileResponse.json();
    setProfileDataArray(profileData);
    console.log("I am profile data", profileData)
  };


  return (
    <div className='home-container'>
      <h1>League Profile Showcase</h1>
      <p>Search for your summoner name and tag to get your profile and history!</p>
      <SearchBar onSearch={handleSearch} />
      {/* <SearchResults  matchHistory={matchHistory}/>  */}
      <Profile profileData={profileDataArray}/>
    </div>
  );
}
