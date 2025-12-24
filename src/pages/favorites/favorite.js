import React, { useState, useEffect } from 'react' ;
import axios from "axios";
import LandingNavBar from "../../components/common/landingNavBar";
import GameCard from "../../components/common/gameCard";
import UserInfo from "../../components/layouts/userInfo";
import GameDialog from "../../components/common/gameDialog";

export default function Favorite({ showLogin, isAuthenticated, userData, userBalance, onSignOut }) {
  const [selectedVendorCode, setSelectedVendorCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(12); // Show 12 cards initially (approx 3 rows)
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showGameDialog, setShowGameDialog] = useState(false);

  const handleGameCardClick = (game) => {
    if (!isAuthenticated) {
      showLogin();
    } else {
      setSelectedGame(game);
      setShowGameDialog(true);
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedCount(prev => prev + 12); // Load 12 more cards (approx 3 more rows)
      setIsLoadingMore(false);
    }, 500);
  };
  
  // Fetch vendors and games on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsInitialLoading(true);
        const [vendorsResponse, gamesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/vendors`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/games`)
        ]);
        
        // Handle response - check if data is directly an array or wrapped in an object
        const vendors = Array.isArray(vendorsResponse.data) 
          ? vendorsResponse.data 
          : (vendorsResponse.data?.data || vendorsResponse.data?.vendors || []);
        const games = Array.isArray(gamesResponse.data) 
          ? gamesResponse.data 
          : (gamesResponse.data?.data || gamesResponse.data?.games || []);
        
        setVendorsData(Array.isArray(vendors) ? vendors : []);
        setGamesData(Array.isArray(games) ? games : []);
        
        // Initial load: filter by recommended === 1
        const recommendedGames = Array.isArray(games) 
          ? games.filter(game => game.recommended === 1)
          : [];
        setFilteredGames(recommendedGames);
        setDisplayedCount(12); // Reset displayed count when data changes
      } catch (error) {
        console.error("Error fetching data:", error);
        setVendorsData([]);
        setGamesData([]);
        setFilteredGames([]);
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleVendorClick = (vendorCode) => {
    setIsLoading(true);
    setSelectedVendorCode(selectedVendorCode === vendorCode ? null : vendorCode);
    setDisplayedCount(12); // Reset displayed count when vendor filter changes
  }

  useEffect(() => {
    if (!Array.isArray(gamesData)) return;
    
    if (isLoading) {
      const timer = setTimeout(() => {
        // First filter by recommended === 1
        let recommendedGames = gamesData.filter(game => game.recommended === 1);
        
        // Then filter by vendor if one is selected
        if (selectedVendorCode) {
          recommendedGames = recommendedGames.filter(game => game.vendorCode === selectedVendorCode);
        }
        
        setFilteredGames(recommendedGames);
        setIsLoading(false);
      }, 500); // Simulate loading delay
      
      return () => clearTimeout(timer);
    } else {
      // Update immediately if not loading (initial load or programmatic change)
      let recommendedGames = gamesData.filter(game => game.recommended === 1);
      
      if (selectedVendorCode) {
        recommendedGames = recommendedGames.filter(game => game.vendorCode === selectedVendorCode);
      }
      
      setFilteredGames(recommendedGames);
    }
  }, [selectedVendorCode, isLoading, gamesData]);

  return (
    <>
      <div className="landing-img">
        <img src="/img/favorite.png" alt="landingImage" />
      </div>
      <div className="landing-img-mobile">
        <img src="/img/favorite.png" alt="favorite" />
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
            <span className="page-title">FAVORITE</span>
            <span className="page-title-mobile">FAVORITE GAME</span>
            <span>SUPPLIER</span>
        </div>

        <div className="newgame-items">
          {Array.isArray(vendorsData) && vendorsData.map((vendor, index) => (
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
            {Array.isArray(vendorsData) && vendorsData.map((vendor, index) => (
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

        {/* <div className="newgames-cards"> */}
          {/* <div className="newgame-card">
                        <img src="" alt="card-image"/>
                        <span>starlight princess</span>
                    </div> */}
          {/* <img src="/img/image 4.png" alt="gamecards" />
        </div>
        <div className="newgames-cards-mobile">
            <img src="/img/mobile-images/image 5.png" alt="gamecards"/>
            <img src="/img/mobile-images/image 6.png" alt="gamecards"/>
        </div> */}
          <div className="new-game-cards">
              {isInitialLoading || isLoading ? (
                  <div className="loading-container">
                      <div className="loading-spinner"></div>
                      <span className="loading-text">Loading...</span>
                  </div>
              ) : filteredGames.length === 0 ? (
                  <div className="no-games-container">
                      <div className="no-games-icon">🎮</div>
                      <span className="no-games-text">No Games Found</span>
                  </div>
              ) : (
                  <>
                      {filteredGames.slice(0, displayedCount).map( ( game, index ) => (
                          <GameCard 
                              title={ game.gameTitle } 
                              image={ game.thumbnail } 
                              key={ index }
                              index={index}
                              onClick={() => handleGameCardClick(game)}
                          />
                      ) )}
                      {displayedCount < filteredGames.length && (
                          <div className="load-more-container">
                              {isLoadingMore ? (
                                  <div className="load-more-loading">
                                      <div className="loading-spinner"></div>
                                      <span className="loading-text">Loading...</span>
                                  </div>
                              ) : (
                                  <button className="load-more-btn" onClick={handleLoadMore}>
                                      Load More
                                  </button>
                              )}
                          </div>
                      )}
                  </>
              )}
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
