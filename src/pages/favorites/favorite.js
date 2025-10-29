// import React from 'react' ;
import LandingNavBar from "../../components/common/landingNavBar";
import { newGamesData } from "../NewGame/components/tempData";

export default function Favorite() {
  return (
    <>
      <div className="landing-img">
        <img src="/img/favorite.png" alt="landingImage" />
      </div>
      <div className="landing-img-mobile">
        <img src="/img/favorite.png" alt="favorite" />
      </div>
        <div className="mobile-login-button">Login</div>
        
        <LandingNavBar />

      <div className="page-body">
        <div className="newgame-title">
            <span className="page-title">FAVORITE</span>
            <span className="page-title-mobile">FAVORITE GAME</span>
            <span>SUPPLIER</span>
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

        <div className="newgames-cards">
          {/* <div className="newgame-card">
                        <img src="" alt="card-image"/>
                        <span>starlight princess</span>
                    </div> */}
          <img src="/img/image 4.png" alt="gamecards" />
        </div>
        <div className="newgames-cards-mobile">
            <img src="/img/mobile-images/image 5.png" alt="gamecards"/>
            <img src="/img/mobile-images/image 6.png" alt="gamecards"/>
        </div>
      </div>
    </>
  );
}
