import React, { useState } from 'react' ;
import { liveData, liveData1 } from "../NewGame/components/tempData";
import vendorsData from "../../temps/vendors.json";
import LiveGameCard from "./components/liveGameCard";
import LandingNavBar from "../../components/common/landingNavBar";
import LiveMobileCard from "./components/liveGameMobileCard";
import UserInfo from "../../components/layouts/userInfo";
import GameDialog from "../../components/common/gameDialog";

export default function Live({ showLogin, isAuthenticated, userData, userBalance, onSignOut }) {
  const [selectedVendorCode, setSelectedVendorCode] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showGameDialog, setShowGameDialog] = useState(false);
  
  const handleVendorClick = (vendorCode) => {
    setSelectedVendorCode(selectedVendorCode === vendorCode ? null : vendorCode);
  }

  const handleGameCardClick = (game) => {
    if (!isAuthenticated) {
      showLogin();
    } else {
      setSelectedGame(game);
      setShowGameDialog(true);
    }
  };

  return (
    <>
      <div className="landing-img">
        <img src="/img/live.png" alt="landingImage" />
      </div>
      <div className="landing-img-mobile">
        <img src="/img/live.png" alt="landingImage" />
      </div>
      {/* {!isAuthenticated && (
        <div className="mobile-login-button" onClick={showLogin}>
          Login
        </div>
      )} */}
      {isAuthenticated && (
        <div className="mobile-user-info-container">
          <UserInfo userData={userData} userBalance={userBalance} />
        </div>
      )}

      <LandingNavBar />

      <div className="page-body">
        <div className="newgame-title">
            <span className="page-title">LIVE</span>
            <span className="page-title-mobile">LIVE</span>
            <span></span>
        </div>

        <div className="newgame-items">
          {vendorsData.map((vendor, index) => (
            <div 
              className={`newgame-item ${selectedVendorCode === vendor.vendorCode ? 'active' : ''}`}
              key={index}
              onClick={() => handleVendorClick(vendor.vendorCode)}
              style={{ cursor: 'pointer' }}
            >
              <span>{vendor.vendorCode}</span>
              <span>{vendor.vendorType}</span>
            </div>
          ))}
        </div>
        <div className="newgame-items-mobile">
          <div className="newgame-items-mobile-view">
            {vendorsData.map((vendor, index) => (
              <div 
                className={`newgame-item-mobile ${selectedVendorCode === vendor.vendorCode ? 'active' : ''}`}
                key={index}
                onClick={() => handleVendorClick(vendor.vendorCode)}
                style={{ cursor: 'pointer' }}
              >
                <span>{vendor.vendorCode}</span>
                <span>{vendor.vendorType}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="live-games">
          {liveData.map((item, index) => {
            // Create a game object with necessary properties for the dialog
            const gameData = {
              gameCode: item.gameCode || item.name?.toLowerCase().replace(/\s+/g, '') || `live${index}`,
              vendorCode: item.vendorCode || 'Evolution-JP',
              gameTitle: item.name,
              thumbnail: item.image
            };
            return (
              <LiveGameCard index={index} data={item} link={"/live/gamedemo"} />
            );
          })}
        </div>
        <div className="slot-mobile-cards">
          {
            liveData1.map( ( item, index ) => {
              // Create a game object with necessary properties for the dialog
              const gameData = {
                gameCode: item.gameCode || item.name?.toLowerCase().replace(/\s+/g, '') || `live${index}`,
                vendorCode: item.vendorCode || 'Evolution-JP',
                gameTitle: item.name,
                thumbnail: item.image
              };
              return (
                <div key={index} onClick={() => handleGameCardClick(gameData)} style={{ cursor: 'pointer' }}>
                  <LiveMobileCard index={index} title={item.name} image={item.image} />
                </div>
              );
            })
          }
        </div>
      </div>
      <GameDialog 
        isOpen={showGameDialog} 
        onClose={() => setShowGameDialog(false)} 
        gameData={selectedGame}
      />
    </>
  );
}
