import PlayButton from "../../../components/common/playButton";
import { ImPlay2 } from "react-icons/im";

export default function GameDemo(){
    return(
        <div className="liveGameDemo">
            <div className="newgame-title">
                <span className="page-title">GEMS BONAZA</span>
                <span>GAME DEMO</span>
            </div>
            <div className="liveGameDemo-image">
                <img src="/img/live1.png" alt="gameDemo" />
            </div>
            <div className="btn_playForReal">
                <PlayButton title ={ <span className="playForReal">PLAY FOR REAL <ImPlay2 /></span> } action = { () => {} }/>
            </div>
        </div>
    )
}