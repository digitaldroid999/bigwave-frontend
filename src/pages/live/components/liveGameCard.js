import React from "react";
import { ImPlay2 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import PlayButton from "../../../components/common/playButton";

export default function LiveGameCard( props ){
    const navigate = useNavigate() ;
    const navigatePate = ( link ) => e => {
        navigate( link , { replace : true } ) ;
    }
    // Use modulo to repeat delay pattern every 4 cards for character image animation
    const animationDelay = props.index !== undefined ? (props.index % 4) * 0.15 : 0;
    return(
        <div className='live-game'>
            <div className='live-game-detail'>
                <div className='live-game-detail-title'>{ props.data.name }</div>
                <div className='live-game-detail-content'>
                    {
                        props.data.content
                    }
                    <div className="playNow">
                        <PlayButton title = { <span className="playNowText">PLAY NOW <ImPlay2 /></span> } action = { navigatePate( props.link ) } />
                    </div>
                </div>
            </div>
            <span className="live-game-name">Game Name</span>
            <div className='live-game-image' style={ { backgroundImage: `url( ${ props.data.back } )` } }>
                <img 
                    src={ props.data.image } 
                    alt='evolution'
                    style={{ 
                        animationDelay: `${animationDelay}s`,
                        '--animation-delay': `${animationDelay}s`
                    }}
                />
            </div>
        </div>
    )
}