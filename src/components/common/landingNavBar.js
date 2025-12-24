import { useNavigate, useLocation } from "react-router-dom";

const itemData = [
    {
        name : 'New Game',
        icon : <img src="/img/icons/Frame.svg" alt="gift" />,
        link : '/newgame'
    },
    {
        name : 'Favorite Game',
        icon : <img src="/img/icons/favorite.svg" alt="favorite" />,
        link : '/favorite'
    },
    {
        name : 'Slot',
        icon : <img src="/img/icons/octicon_goal-24.svg" alt="gift" />,
        link : '/slot'
    },
    {
        name : 'Live',
        icon : <img src="/img/icons/live.svg" alt="live" />,
        link : '/live'
    },
] ;

export default function LandingNavBar(){
    const navigate = useNavigate() ;
    const location = useLocation() ;
    const navigatePage = ( link ) => e => {
        navigate( link, { replace : true } ) ;
    }
    return(
        <>
            <div className='landing-nav-mobile'>
                {
                    itemData.map( ( item, index ) => (
                        <div 
                            className={`landing-nav-mobile-item ${location.pathname === item.link ? 'active' : ''}`} 
                            key={ index } 
                            onClick={ navigatePage( item.link ) }
                        >
                            { item.icon }
                            <span>{ item.name }</span>
                        </div>
                    ) )
                }
            </div>
        </>
    )
}