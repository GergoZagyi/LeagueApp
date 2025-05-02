import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const apiKey = process.env.RIOT_API_KEY;
  const { searchParams } = new URL(req.url);
  const summonerName = searchParams.get('summoner');
  const summonerTag = searchParams.get('tag');
  const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${apiKey}`);
  const data = await response.json();
  return NextResponse.json(data);
}