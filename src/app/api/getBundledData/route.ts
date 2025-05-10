import { NextResponse } from "next/server";


export async function GET(req:Request){
    const apiKey = process.env.RIOT_API_KEY;
    const {searchParams} = new URL(req.url);
    const summonerName = searchParams.get('summoner');
    const summonerTag = searchParams.get('tag');

    const accountRes = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${apiKey}`);
    const accountData = await accountRes.json();
    const puuid = accountData.puuid;

    const matchesRes = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=25&api_key=${apiKey}`);
    const matchIds: string[] = await matchesRes.json();

    const win: boolean[] = [];
    const kills: number[] = [];
    const deaths: number[] = [];
    const assists: number[] = [];
    const goldEarned: number[] = [];
    const cs: number[] = [];
    const champName: string[] = [];
    const champLevel: number[] = [];
    const damageDealt: number[] = [];
    const damageTaken: number[] = [];
    const wardsPlaced: number[] = [];
    const wardsKilled: number[] = [];
    const gameDuration: number[] = [];



  for (const matchId of matchIds) {
    const res = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`);
    const match = await res.json();

    const participant = match.info.participants.find((p: any) => p.puuid === puuid);
    if (!participant) continue;

    kills.push(participant.kills);
    deaths.push(participant.deaths);
    assists.push(participant.assists);
    goldEarned.push(participant.goldEarned);
    cs.push(participant.totalMinionsKilled);
    champName.push(participant.championName);
    champLevel.push(participant.champLevel);
    damageDealt.push(participant.totalDamageDealtToChampions);
    damageTaken.push(participant.totalDamageTaken);
    wardsPlaced.push(participant.wardsPlaced);
    wardsKilled.push(participant.wardsKilled);
    gameDuration.push(match.info.gameDuration);
    win.push(participant.win);
  }

  const bundledData = {
    kills,
    deaths,
    assists,
    goldEarned,
    cs,
    champName,
    wardsKilled,
    wardsPlaced,
    win,
    damageDealt,
    damageTaken
  };

  return NextResponse.json(bundledData);
}
