// import React from 'react' ;
import { newGamesData } from '../NewGame/components/tempData';

export default function Favorite(){
    return(
        <div>
            <div className='landing-img'>
                <img src='/img/favorite.png' alt='landingImage' />
            </div>
            <div className='page-body'>
                <div className="newgame-title">
                    <span className="page-title">FAVORITE</span>
                    <span>SUPPLIER</span>
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
                
                <div className="newgames-cards">
                    {/* <div className="newgame-card">
                        <img src="" alt="card-image"/>
                        <span>starlight princess</span>
                    </div> */}
                    <img src="/img/image 4.png" alt="gamecards"/>
                </div>
            </div>
        </div>
    )
}