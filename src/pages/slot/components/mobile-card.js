import { MdPlayCircleOutline } from "react-icons/md";
export default function SlotMobileCard( props ) {
    // Use modulo to repeat delay pattern every 12 cards, preventing long delays for newly loaded cards
    const animationDelay = props.index !== undefined ? (props.index % 12) * 0.03 : 0;
    return(
        <div 
            className="slot-mobile-card"
            style={{ 
                animationDelay: `${animationDelay}s`,
                '--animation-delay': `${animationDelay}s`
            }}
        >
            <img src={ `/img/mobileCards/cardBack${ ( props.index + 1 ) % 2 }.png` } className="card-background" alt = { props.index } />
            <div className="slot-mobile-card-black"></div>
            <img src={ props.image } className={ `mobile-card-doll${ props.index % 2 + 1 }`}  alt = { props.index }/>
            <div className={ `slot-mobile-card-content${ props.index % 2 + 1 }` }>
                <div className="slot-mobile-card-title">{ props.title }</div>
                <button className="slot-mobile-play-btn">
                    <span>PLAY GAME</span> <MdPlayCircleOutline className="play-icon" />
                </button>
            </div>
        </div>
    )
}