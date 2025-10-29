import { useNavigate } from "react-router-dom";

const itemData = [
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
] ;

export default function LandingNavBar(){
    const navigate = useNavigate() ;
    const navigatePage = ( link ) => e => {
        navigate( link, { replace : true } ) ;
    }
    return(
        <>
            <div className='landing-nav-mobile'>
                {
                    itemData.map( ( item, index ) => (
                        <div className='landing-nav-mobile-item' key={ index } onClick={ navigatePage( item.link ) }>
                            { item.icon }
                            <span>{ item.name }</span>
                        </div>
                    ) )
                }
            </div>
        </>
    )
}