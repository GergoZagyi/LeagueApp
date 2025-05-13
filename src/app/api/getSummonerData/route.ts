import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const apiKey = process.env.RIOT_API_KEY;
  const { searchParams } = new URL(req.url);
  const summonerName = searchParams.get('summoner');
  const summonerTag = searchParams.get('tag');

  /* Get puuid */
  const accountRes = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${apiKey}`);
  const accountData = await accountRes.json();
  const puuid = accountData.puuid;

  /* Get last 10 match IDs */
  const matchesRes = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`);
  const matchIds: string[] = await matchesRes.json();
  console.log("matchIds: ", matchIds);
  
  /* Get match details for each matchID */
  const matchDataPromises = matchIds.map(async (matchId) => {
    const res = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`);
    const match = await res.json();

    const participant = match.info.participants.find((p: any) => p.puuid === puuid);
    return {
      matchId,
      win: participant.win,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      goldEarned: participant.goldEarned,
      totalMinionsKilled: participant.totalMinionsKilled,
      champName: participant.championName,
      role: participant.role,
      lane: participant.lane,
      gameDuration: match.info.gameDuration,
    };
  });

  const matchStats = await Promise.all(matchDataPromises);
  return NextResponse.json(matchStats);
}
