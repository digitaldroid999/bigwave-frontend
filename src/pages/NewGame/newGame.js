import React from "react";

import { newGamesData } from "./components/tempData";
export default function NewGame(){
    return(
        <>
            <div className='landing-img'>
                <img src='/img/newgameback.png' alt='landingImage' />
            </div>
            <div className="page-body">
                <div className="newgame-title">
                    <span className="page-title">NEW GAME</span>
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
                    <img src="/img/image 3.png" alt="gamecards"/>
                </div>
            </div>
        </>
    )
}