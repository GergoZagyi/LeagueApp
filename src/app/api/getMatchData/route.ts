import { NextResponse } from "next/server";

export async function GET(req: Request){
    const apiKey = process.env.RIOT_API_KEY;
    const {searchParams} = new URL(req.url);
    const puuid = searchParams.get("puuid")
    const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`)
    const data = await response.json();
    return NextResponse.json(data)
}