'use client'



export default function SearchResults(){

    const handleMatchFetch = async ()=>{
        const response = await fetch(`http://localhost:3000/api/getMatchData?puuid=${puuid}`)
        const data = await response.json();
        console.log(data)
    }

    return(
        <div>
            <button
            onClick={handleMatchFetch}
            ></button>
        </div>
    )
}