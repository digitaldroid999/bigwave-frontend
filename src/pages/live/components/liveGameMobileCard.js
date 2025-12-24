import { MdPlayCircleOutline } from "react-icons/md";
export default function LiveMobileCard( props ) {
    // Use modulo to repeat delay pattern every 4 cards for character image animation
    const animationDelay = props.index !== undefined ? (props.index % 4) * 0.15 : 0;
    return(
        <div className="slot-mobile-card">
            <img src={ `/img/mobileCards/cardBack${ ( props.index + 1 ) % 2 }.png` } className="card-background" alt="background"/>
            <div className="slot-mobile-card-black"></div>
            <img 
                src={ props.image } 
                className={ `live-mobile-card-doll${ props.index + 1 }`} 
                alt="card-doll"
                style={{ 
                    animationDelay: `${animationDelay}s`,
                    '--animation-delay': `${animationDelay}s`
                }}
            />
            <div className={ `slot-mobile-card-content${ props.index % 2 + 1 }` }>
                <div className="slot-mobile-card-title">{ props.title }</div>
                <button className="slot-mobile-play-btn">
                    <span>PLAY GAME</span> <MdPlayCircleOutline className="play-icon" />
                </button>
            </div>
        </div>
    )
}