import { FaAngleDown } from "react-icons/fa"
import { CiHome } from "react-icons/ci"
import { MdLiveTv } from "react-icons/md"
import { Link } from "react-router-dom"
import { CiMobile3 } from "react-icons/ci"
import { useEffect } from "react"

const itemData = [
    {
        name : 'Home',
        icon : <img src="/icons/home.svg" alt="home" />,
        link : '/'
    },
    {
        name : 'New Game',
        icon : <img src="/icons/Frame.svg" alt="gift" />,
        link : '/newgame'
    },
    {
        name : 'Favorite Game',
        icon : <img src="/icons/favorite.svg" alt="favorite" />,
        link : '/favorite'
    },
    {
        name : 'Slot',
        icon : <img src="/icons/octicon_goal-24.svg" alt="gift" />,
        link : '/slot'
    },
    {
        name : 'Live',
        icon : <img src="/icons/live.svg" alt="live" />,
        link : '/live'
    },
]

export default function Menu( { showHandle, setShowHandle } ) {
    useEffect( () => {
        if( showHandle ){
            document.body.style.overflow = 'hidden' ;
        } else{
            document.body.style.overflow = 'auto' ;
        }
    }, [ showHandle ] ) ;
    return(
    <div>
        <div className="menu-black" style={ { display : ( showHandle ? 'flex' : 'none' ) } } onClick={ () => setShowHandle( false ) }></div>
        <div className="nav-menu" style={ showHandle ? { left: '0' } : {} }>
            <div>
                <div className="nav-lang">
                    <img src="/img/flags/default.png" alt="countryFlag" />
                    <span>English</span>
                    <FaAngleDown />
                </div>
                <div className="nav-menu-items">
                    {
                        itemData.map( ( item, index ) => (
                            <Link className="nav-menu-item" key={ index } to={ item.link } >
                                { item.icon }
                                <span> { item.name } </span>
                            </Link>
                        ) )
                    }
                </div>
            </div>

            <div>
                <div className="user-sign-btn-menu">
                    <div className="btn_login">
                        <span>Login</span>
                    </div>
                    <div className="btn_login">
                        <span>Sign Up</span>
                    </div>
                </div>

                <div className="MobileVersion-Menu">
                    <div className="menu-item-mobile">
                        <CiMobile3 />
                        Mobile Version
                    </div>
                    <div className="menu-item-mobile-mode">
                        <img src="/icons/pc.svg" alt="pc"/>
                        PC Version
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}