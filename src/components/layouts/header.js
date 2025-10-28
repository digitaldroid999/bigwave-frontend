import React, { useState } from "react";
import Menu from './menu' ;
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdLiveTv } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";

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

export default function Header() {
    const [ time, setTime ] = useState( new Date() ) ;
    const navigate = useNavigate() ;
    const navigatePage = ( link ) => e => {
        navigate( link, { replace : true } ) ;
    }
    const [ showMenu, setShowMenu ] = useState( false ) ;
    
    return(
        <>
        <div className="header">
            <div className="header-logo">
                <img src="/img/vector.svg" alt="vector.svg" onClick={ () => setShowMenu( !showMenu ) } />
                <img src="/img/logo 1.png" alt="logo" />
                <FaCircleUser className="user-mobile-show"/>
            </div>
            <div className="user-sign">
                <div className="user-name">
                    <span>User Name</span>
                    <input type="text" />
                </div>
                <div className="user-password">
                    <span>Password</span>
                    <input type="password" />
                </div>
                <div className="user-sign-btn">
                    <div className="btn_login">
                        <span>Login</span>
                    </div>
                    <div className="btn_login">
                        <span>Sign Up</span>
                    </div>
                </div>
            </div>
            <div className="user-timezone">
                <div className="timezone-time">{ time.toISOString() }</div>
                <div className="user-country-flag">
                    <img src="/img/flags/default.png" alt="countryFlag" />
                    <FaAngleDown />
                </div>
            </div>
        </div>
        <div className="header-nav">
            <div className="nav-item-mobile">
                <CiMobile3 />
                Mobile Version
            </div>
            {
                itemData.map( ( item, index ) => (
                    <div className="nav-item" key={ index } onClick={ navigatePage( item.link ) }>
                        { item.icon }
                        <span>{ item.name }</span>
                    </div>
                ) )
            }
        </div>

        {/* Mobile Version */}
        <div className="header-nav-mobile">
            <div className="nav-item-change-mode">
                <img src="/icons/pc.svg" alt="pc"/>
                PC Version
            </div>
            <div className="user-timezone-mobile">
                <div className="timezone-time">{ time.toISOString() }</div>
                <div className="user-country-flag">
                    <img src="/img/flags/default.png" alt="countryFlag" />
                    <FaAngleDown />
                </div>
            </div>
        </div>
        <Menu showHandle={ showMenu } setShowHandle = { setShowMenu } />
    </>
    )
} ;