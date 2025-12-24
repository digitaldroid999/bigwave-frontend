import React, { useState, useEffect } from 'react' ;
import { useNavigate, useLocation } from 'react-router-dom';
import { RiSearchLine } from "react-icons/ri";
import { landingDatas } from './landingComponents/landingDatas';
import PlayButton from '../common/playButton';
import { CiHome } from 'react-icons/ci';
import { MdLiveTv } from 'react-icons/md';
import UserInfo from './userInfo';
import axios from 'axios';
import GameDialog from '../common/gameDialog';

const itemData = [
    {
        name : 'New Game',
        icon : <img src="/img/icons/Frame.svg" alt="gift" />,
        link : '/newgame'
    },
    {
        name : 'Favorite Game',
        icon : <img src="/img/icons/favorite.svg" alt="favorite" />,
        link : '/favorite'
    },
    {
        name : 'Slot',
        icon : <img src="/img/icons/octicon_goal-24.svg" alt="gift" />,
        link : '/slot'
    },
    {
        name : 'Live',
        icon : <img src="/img/icons/live.svg" alt="live" />,
        link : '/live'
    },
]


export default function Landing({ showLogin, isAuthenticated, userData, userBalance, onSignOut }) {
    const navigate = useNavigate() ;
    const location = useLocation() ;
    const navigateOther = ( link ) => e => {
        navigate( link, { replace : true } ) ;
    }
    
    const [gamesData, setGamesData] = useState([]);
    const [newGames, setNewGames] = useState([]);
    const [favoriteGames, setFavoriteGames] = useState([]);
    const [slotGames, setSlotGames] = useState([]);
    const [liveGames, setLiveGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [showGameDialog, setShowGameDialog] = useState(false);
    
    // Fetch games data
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/games`);
                const games = Array.isArray(response.data) 
                    ? response.data 
                    : (response.data?.data || response.data?.games || []);
                
                setGamesData(Array.isArray(games) ? games : []);
                
                // Filter games based on conditions
                // New Game: recent === 1
                const newGamesFiltered = games.filter(game => game.recent === 1).slice(0, 10);
                setNewGames(newGamesFiltered);
                
                // Favorite Game: recommended === 1 (or favourite === 1 as fallback)
                const favoriteGamesFiltered = games.filter(game => 
                    game.recommended === 1 || game.favourite === 1
                ).slice(0, 10);
                setFavoriteGames(favoriteGamesFiltered);
                
                // Slot game: gameType === 'slot' or 'SLOT'
                const slotGamesFiltered = games.filter(game => 
                    game.gameType?.toLowerCase() === 'slot'
                ).slice(0, 10);
                setSlotGames(slotGamesFiltered);
                
                // Live: all games (first 10)
                const liveGamesFiltered = games.slice(0, 10);
                setLiveGames(liveGamesFiltered);
            } catch (error) {
                console.error("Error fetching games:", error);
                setGamesData([]);
            }
        };
        
        fetchGames();
    }, []);
    
    const handleGameCardClick = (game) => {
        if (!isAuthenticated) {
            showLogin();
        } else {
            setSelectedGame(game);
            setShowGameDialog(true);
        }
    };
    
    // Get filtered games for each carousel
    const getFilteredGames = (index) => {
        switch(index) {
            case 0: // New Game
                return newGames;
            case 1: // Favorite Game
                return favoriteGames;
            case 2: // Slot
                return slotGames;
            case 3: // Live
                return liveGames;
            default:
                return [];
        }
    };
    return(
        <>
        <div className='Landing'>
            <div className='landing-img'>
                <img src='/img/image 1.png' alt='landingImage' />
            </div>
            <div className='landing-body'>
                <div className='landing-search-div'>
                    <input className='landing-search' placeholder='search for games'/>
                    <RiSearchLine />
                </div>
                <div className='landing-filter'>
                    <span> { "All Providers" } </span>
                    <img src='/img/icons/Vector.svg' alt='menu' />
                </div>
                <div className='landing-fields'>
                    {
                        landingDatas.map( ( item, index ) => (
                            <div className='landing-field' key={ index }>
                                <img className='landing-image-back' src={ `/img/first-page/back-${ index + 1 }.png` } alt='background' />
                                <img className={ `landing-image-girl fix-img${index}` }
                                     src={ `/img/first-page/g${ index + 1 }.png` } alt='girl' />
                                {/* <div className='casino_btn landing_btn' onClick={ navigateOther( item.link ) }> { item.name } </div> */}
                                <div className='casino_btn landing_btn'>
                                    <PlayButton title = { <span> { item.name } </span>} type = { 'grey' } action = { navigateOther( item.link ) } />
                                </div>
                            </div>
                        ) )
                    }
                </div>
            </div>
        </div>
        
        <div className='Landing-mobile'>
            <div className='landing-img-mobile'>
                <img src='/img/image 1.png' alt='landingImage' />
            </div>
            <div className='landing-body'>
                {/* {!isAuthenticated && (
                    <div className='mobile-login-button' onClick={showLogin}>
                        Login
                    </div>
                )} */}
                {isAuthenticated && (
                    <div className="mobile-user-info-container">
                        <UserInfo userData={userData} userBalance={userBalance} />
                    </div>
                )}
                <div className='landing-nav-mobile'>
                    {
                        itemData.map( ( item, index ) => (
                            <div 
                                className={`landing-nav-mobile-item ${location.pathname === item.link ? 'active' : ''}`} 
                                key={ index } 
                                onClick={ navigateOther( item.link ) }
                            >
                                { item.icon }
                                <span>{ item.name }</span>
                            </div>
                        ) )
                    }
                </div>
                {
                    itemData.map( ( item, index ) => {
                        const filteredGames = getFilteredGames(index);
                        // Hide the entire section if there are no games
                        if (filteredGames.length === 0) {
                            return null;
                        }
                        return (
                            <div className='landing-games-mobile' key={ index }>
                                <div className='landing-games-list-title'>
                                    <div>
                                        { item.icon }
                                        <span> { item.name } </span>
                                    </div>
                                    <div className='landing-game-btn-seeMore' onClick={navigateOther(item.link)}>
                                        SEE MORE
                                    </div>
                                </div>
                                <div className='landing-games-list-one-mobile'>
                                    {
                                        filteredGames.map( ( game, gameIndex ) => (
                                            <div 
                                                className='landing-game-one' 
                                                key={ gameIndex }
                                                onClick={() => handleGameCardClick({
                                                    gameCode: game.gameCode,
                                                    vendorCode: game.vendorCode,
                                                    gameTitle: game.gameTitle || game.gameTitleKr,
                                                    thumbnail: game.thumbnail
                                                })}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img src={ game.thumbnail || '/img/mobile-images/@ (1).png' } alt={game.gameTitle || 'game'} />
                                                <span>{ game.gameTitle || game.gameTitleKr || 'Game' }</span>
                                            </div>
                                        ) )
                                    }
                                </div>
                            </div>
                        );
                    } )
                }
            </div>
        </div>
        <GameDialog 
            isOpen={showGameDialog} 
            onClose={() => setShowGameDialog(false)} 
            gameData={selectedGame}
        />
        </>
    )
}