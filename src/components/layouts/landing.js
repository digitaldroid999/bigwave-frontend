import React, { useState, useEffect } from 'react' ;
import { useNavigate } from 'react-router-dom';
import { RiSearchLine } from "react-icons/ri";
import { landingDatas } from './landingComponents/landingDatas';
import PlayButton from '../common/playButton';
import { CiHome } from 'react-icons/ci';
import { MdLiveTv } from 'react-icons/md';

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
]

const mobileGamesData = [
    {
        name : 'BRITISH ROULETTE',
        image : '/img/mobile-images/@ (1).png'
    },
    {
        name : "GOZNO'S QUEST",
        image : '/img/mobile-images/@ (2).png'
    },
    {
        name : 'BORDERLANDS3',
        image : '/img/mobile-images/@ (3).png'
    },
    {
        name : 'BRAZIL ROULETTE',
        image : '/img/mobile-images/@ (4).png'
    },
    {
        name : 'BRITISH ROULETTE',
        image : '/img/mobile-images/@ (1).png'
    }
] ;

export default function Landing() {
    const navigate = useNavigate() ;
    const navigateOther = ( link ) => e => {
        navigate( link, { replace : true } ) ;
    }
    return(
        <>
        <div className='Landing'>
            <div className='landing-img'>
                <img src='/img/image 1.png' alt='landingImage' />
            </div>
            <div className='landing-body'>
                <div className='landing-search-div'>
                    <input className='landing-search' placeholder='search for games'/>
                    <RiSearchLine />
                </div>
                <div className='landing-filter'>
                    <span> { "All Providers" } </span>
                    <img src='/icons/Vector.svg' alt='menu' />
                </div>
                <div className='landing-fields'>
                    {
                        landingDatas.map( ( item, index ) => (
                            <div className='landing-field' key={ index }>
                                <img className='landing-image-back' src={ `/img/first-page/back-${ index + 1 }.png` } alt='background' />
                                <img className={ `landing-image-girl fix-img${index}` }
                                     src={ `/img/first-page/g${ index + 1 }.png` } alt='girl' />
                                {/* <div className='casino_btn landing_btn' onClick={ navigateOther( item.link ) }> { item.name } </div> */}
                                <div className='casino_btn landing_btn'>
                                    <PlayButton title = { <span> { item.name } </span>} type = { 'grey' } />
                                </div>
                            </div>
                        ) )
                    }
                </div>
            </div>
        </div>
        
        <div className='Landing-mobile'>
            <div className='landing-img-mobile'>
                <img src='/img/image 1.png' alt='landingImage' />
            </div>
            <div className='landing-body'>
                <div className='mobile-login-button'>Login</div>
                <div className='landing-nav-mobile'>
                    {
                        itemData.map( ( item, index ) => (
                            <div className='landing-nav-mobile-item' key={ index } onClick={ navigateOther( item.link ) }>
                                { item.icon }
                                <span>{ item.name }</span>
                            </div>
                        ) )
                    }
                </div>
                {
                    itemData.map( ( item, index ) => (
                        <div className='landing-games-mobile' key={ index }>
                            <div className='landing-games-list-title'>
                                <div>
                                    { item.icon }
                                    <span> { item.name } </span>
                                </div>
                                <div className='landing-game-btn-seeMore'>
                                    SEE MORE
                                </div>
                            </div>
                            <div className='landing-games-list-one-mobile'>
                                {
                                    mobileGamesData.map( ( item, index ) => (
                                        <div className='landing-game-one' key={ index }>
                                            <img src={ item.image } alt='image' />
                                            <span>{ item.name }</span>
                                        </div>
                                    ) )
                                }
                            </div>
                        </div>
                     ) )
                }
            </div>
        </div>
        </>
    )
}