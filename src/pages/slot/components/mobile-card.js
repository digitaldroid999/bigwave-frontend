import { ImPlay2 } from "react-icons/im"
import { MdPlayCircleOutline } from "react-icons/md";
export default function SlotMobileCard( props ) {
    return(
        <div className="slot-mobile-card">
            <img src={ `/img/mobileCards/cardBack${ ( props.index + 1 ) % 2 }.png` } className="card-background" />
            <div className="slot-mobile-card-black"></div>
            <img src={ props.image } className={ `mobile-card-doll${ props.index % 2 + 1 }`} />
            <div className={ `slot-mobile-card-content${ props.index % 2 + 1 }` }>
                <div className="slot-mobile-card-title">{ props.title }</div>
                <button className="slot-mobile-play-btn">
                    <span>PLAY GAME</span> <MdPlayCircleOutline className="play-icon" />
                </button>
            </div>
        </div>
    )
}