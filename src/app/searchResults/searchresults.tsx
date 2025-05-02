'use client'

type SearchResultsProps = {
    puuid: string;
}

export default function SearchResults({puuid}: SearchResultsProps){

    const handleMatchFetch = async ()=>{
        const response = await fetch(`http://localhost:3000/api/getMatchData?puuid=${puuid}`)
        const data = await response.json();
        console.log(data)
        console.log("I am puuid", puuid)
    }

    return(
        <div>
            <button
            onClick={handleMatchFetch}
            >
                I AM SEARCH RESULTS
            </button>
        </div>
    )
}