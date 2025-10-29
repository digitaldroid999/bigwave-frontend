import React from "react";
import { newGamesData, slotlist, slotlist1 } from "../NewGame/components/tempData";
import SlotItemCard from "./components/item-card";
import LandingNavBar from "../../components/common/landingNavBar";
import SlotMobileCard from "./components/mobile-card";

export default function Slot() {
  return (
    <>
      <div className="landing-img">
        <img src="/img/newgameback.png" alt="landingImage" />
      </div>
      <div className="landing-img-mobile">
        <img src="/img/newgameback.png" alt="landingImage" />
      </div>
      <div className="mobile-login-button">Login</div>

      <LandingNavBar />

      <div className="page-body">
        <div className="newgame-title">
            <span className="page-title">NEW GAME</span>
            <span className="page-title-mobile">NEW GAME</span>
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
        
        <div className="slot-cards">
          {slotlist.map((item, index) => (
            <SlotItemCard image={item} key={index} />
          ))}
        </div>
        <div className="slot-mobile-cards">
          {
            slotlist1.map( ( item, index ) => (
              <SlotMobileCard index = { index } key = { index } title = { item.name } image = { item.image } />
            ))
          }
        </div>
      </div>
    </>
  );
}
