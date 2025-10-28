// import React from 'react' ;
import { newGamesData, liveData } from '../NewGame/components/tempData';
import LiveGameCard from './components/liveGameCard';

export default function Live(){
    return(
        <div>
            <div className='landing-img'>
                <img src='/img/live.png' alt='landingImage' />
            </div>
            <div className='page-body'>
                
                <div className="newgame-title">
                    <span className="page-title">LIVE</span>
                </div>
                
                <div className="newgame-items">
                    {
                        newGamesData.map( ( item, index ) => (
                            <div className="newgame-item" key={ index }>
                                <span>{ item }</span>
                                <span>GAME SUPPLIER</span>
                            </div>
                        ) )
                    }
                </div>
                <div className='live-games'>
                    {
                        liveData.map( ( item, index ) => (
                            <LiveGameCard key = { index } data = { item } link = { '/live/gamedemo' } />
                        ) )
                    }
                </div>
            </div>
        </div>
    )
}