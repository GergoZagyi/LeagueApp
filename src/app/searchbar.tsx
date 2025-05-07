'use client';

import "./searchbar.css";
import { useState } from "react";

type SearchBarProps ={
    onSearch: (summonerName: string, summonerTag: string) => void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
    

    const [summonerName, setSummonerName] = useState("");
    const [summonerTag, setSummonerTag] = useState("");


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSummonerName(event.target.value);
    };
    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSummonerTag(event.target.value);
    }
    const handleClick = () => {
        onSearch(summonerName, summonerTag);
    }

    return (
        <div className="searchbar-container">
        <input
            onChange={handleNameChange}
            type="text"
            placeholder="Search for a summoner..."
        />
        <input 
            type="text"
            placeholder="Tag"
            onChange={(handleTagChange)}
        />
        <button 
            onClick={handleClick}>
            Search
        </button>
        </div>
    );
}