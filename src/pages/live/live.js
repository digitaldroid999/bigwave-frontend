// import React from 'react' ;
import { newGamesData, liveData, liveData1 } from "../NewGame/components/tempData";
import LiveGameCard from "./components/liveGameCard";
import LandingNavBar from "../../components/common/landingNavBar";
import LiveMobileCard from "./components/liveGameMobileCard";

export default function Live() {
  return (
    <>
      <div className="landing-img">
        <img src="/img/live.png" alt="landingImage" />
      </div>
      <div className="landing-img-mobile">
        <img src="/img/live.png" alt="landingImage" />
      </div>
      <div className="mobile-login-button">Login</div>

      <LandingNavBar />

      <div className="page-body">
        <div className="newgame-title">
            <span className="page-title">LIVE</span>
            <span className="page-title-mobile">LIVE</span>
            <span></span>
        </div>

        <div className="newgame-items">
          {newGamesData.map((item, index) => (
            <div className="newgame-item" key={index}>
              <span>{item}</span>
              <span>GAME SUPPLIER</span>
            </div>
          ))}
        </div>
        <div className="newgame-items-mobile">
          <div className="newgame-items-mobile-view">
            {newGamesData.map((item, index) => (
              <div className="newgame-item-mobile" key={index}>
                <span>{item}</span>
                <span>GAME SUPPLIER</span>
              </div>
            ))}
          </div>
        </div>

        <div className="live-games">
          {liveData.map((item, index) => (
            <LiveGameCard key={index} data={item} link={"/live/gamedemo"} />
          ))}
        </div>
        <div className="slot-mobile-cards">
          {
            liveData1.map( ( item, index ) => (
              <LiveMobileCard index = { index } key = { index } title = { item.name } image = { item.image } />
            ))
          }
        </div>
      </div>
    </>
  );
}
