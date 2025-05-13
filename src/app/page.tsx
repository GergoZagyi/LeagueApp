
'use client';
import './global.css';
import { useState } from 'react';
import SearchBar from './searchbar';
import SearchResults from './searchResults/searchresults';
import Profile from './profileResults/profilePage'; 
import { ProfileData } from './profileResults/profileTypes';

export default function Home() {
  const [summonerName, setSummonerName] = useState('');
  const [summonerTag, setSummonerTag] = useState('');
  const [puuid, setPuuid] = useState('');

  const [matchHistory, setMatchHistory] = useState([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null); 

  const [activeSection, setActiveSection] = useState<'matchHistory' | 'profile' | null>(null);

  const handleSearch = async (summonerName: string, summonerTag: string) => {
    setSummonerName(summonerName);
    setSummonerTag(summonerTag);
    setActiveSection('matchHistory');

    const response = await fetch(`/api/getSummonerData?summoner=${summonerName}&tag=${summonerTag}`);
    const data = await response.json();
    setPuuid(data.puuid);
    setMatchHistory(data);

    const profileResponse = await fetch(`/api/getBundledData?summoner=${summonerName}&tag=${summonerTag}`);
    const profileData = await profileResponse.json();
    setProfileData(profileData);  
  };
  console.log(summonerName, summonerTag, puuid);
  return (
    <div className="home-container">
      <h1>League Profile Showcase</h1>
      <p>Search for your summoner name and tag to get your profile and history!</p>
      <SearchBar onSearch={handleSearch} />

      {activeSection && (
        <div className="button-toggle">
          <button onClick={() => setActiveSection('matchHistory')}>Match History</button>
          <button onClick={() => setActiveSection('profile')}>Profile</button>
        </div>
      )}

      {activeSection === 'matchHistory' && <SearchResults matchHistory={matchHistory} />}
      {activeSection === 'profile' && profileData && (
        <Profile profileData={profileData} /> 
      )}
    </div>
  );
}
