import './profile.css';
import KdaChart from './chartComponents/kdaChart';
import GoldCsChart from './chartComponents/goldCsChart';
import VisionChart from './chartComponents/visionChart';
import ChampPieChart from './chartComponents/champChart';

export type ProfileData = {
  kills: number[];
  deaths: number[];
  assists: number[];
  goldEarned: number[];
  cs: number[];
  wardsPlaced: number[];
  wardsKilled: number[];
  champName: string[];
};

type ProfileProps = {
  profileData: ProfileData;
};

export default function Profile({ profileData }: ProfileProps) {
  const { kills, deaths, assists, goldEarned, cs, wardsPlaced, wardsKilled, champName } = profileData;

  const totalKills = kills.reduce((acc, curr) => acc + curr, 0);
  const totalDeaths = deaths.reduce((acc, curr) => acc + curr, 0);
  const totalAssists = assists.reduce((acc, curr) => acc + curr, 0);
  const totalGold = goldEarned.reduce((acc, curr) => acc + curr, 0);
  const totalCs = cs.reduce((acc, curr) => acc + curr, 0);
  const kda = ((totalKills + totalAssists) / (totalDeaths || 1)).toFixed(2);

  return (
    <div className="profile-wrapper">
      <h1>Profile</h1>
      <div className="profile-stats-wrapper">
        <div className="profile-stats-element">
          <h3>Total KDA</h3>
          <h4>{kda}</h4>
          <div className="profile-stats">
            <KdaChart kills={totalKills} deaths={totalDeaths} assists={totalAssists} />
          </div>
        </div>
        <div className="profile-stats-element">
          <h3>Gold Earned and CS</h3>
          <div className="profile-stats">
            <GoldCsChart gold={goldEarned} cs={cs} />
          </div>
        </div>
        <div className="profile-stats-element">
          <h3>Vision</h3>
          <div className="profile-stats">
            <VisionChart wardsPlaced={wardsPlaced} wardsKilled={wardsKilled} />
          </div>
        </div>
        <div className="profile-stats-element">
          <h3>Champs Played</h3>
          <div className="profile-stats">
            <ChampPieChart champName={champName} />
          </div>
        </div>
      </div>
    </div>
  );
}
