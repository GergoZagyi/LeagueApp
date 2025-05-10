import './profile.css'
import KdaChart from './chartComponents/kdaChart';
import GoldCsChart from './chartComponents/goldCsChart';
import VisionChart from './chartComponents/visionChart';
import ChampPieChart from './chartComponents/champChart';

type profileProps = {
    profileData: any;
    profileDataArray : any[];
}

export default function Profile(profileDataArray : profileProps){
    
    const kills = profileDataArray.profileData.kills;
    const totalKills = kills.reduce((acc: number, curr: number) => acc + curr, 0);

    const deaths = profileDataArray.profileData.deaths;
    const totalDeaths = deaths.reduce((acc: number, curr: number) => acc + curr, 0);

    const assists = profileDataArray.profileData.assists;
    const totalAssists = assists.reduce((acc: number, curr: number) => acc + curr, 0);

    const goldEarned = profileDataArray.profileData.goldEarned;
    const totalGoldEarned = goldEarned.reduce((acc: number, curr: number) => acc + curr, 0);

    const cs = profileDataArray.profileData.cs;
    const totalCs = cs.reduce((acc: number, curr: number) => acc + curr, 0);
    
    const wardsPlaced = profileDataArray.profileData.wardsPlaced;
    const wardsKilled = profileDataArray.profileData.wardsKilled;


    const champName = profileDataArray.profileData.champName;

    const gamesNumber = profileDataArray.profileData.kills.length;
    const kDA = ((totalKills + totalAssists) / (totalDeaths || 1)).toFixed(2); 
    

    function loggingProfileData(){
        console.log("Kills", kills);
        console.log("Deaths", deaths);
        console.log("Assists", assists);
        console.log("Champs Played" , champName);
    }   
    return(

        <div className="profile-wrapper">
            <h1>Profile</h1>            
                <div className="profile-stats-wrapper">
                    <div className="profile-stats-element">
                        <h3>Total KDA</h3>
                        <h4>{kDA}</h4>
                        <div className="profile-stats">
                            <KdaChart kills={totalKills} deaths={totalDeaths} assists={totalAssists}/>
                        </div>
                    </div>
                    <div className="profile-stats-element">
                        <h3>Gold Earned and CS</h3>
                        <div className="profile-stats">
                            <GoldCsChart gold={goldEarned} cs={cs}/>
                        </div>
                    </div>
                    <div className="profile-stats-element">
                        <h3>Vision</h3>
                        <div className="profile-stats">
                            <VisionChart wardsPlaced={wardsPlaced} wardsKilled={wardsKilled}/>
                        </div>
                    </div>
                    <div className="profile-stats-element">
                        <h3>Champs Played</h3>
                        <div className="profile-stats">
                            <ChampPieChart champName={champName}/>
                        </div>
                    </div>

                </div>
        </div>
    )
}