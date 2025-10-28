import React from 'react' ;
import { newGamesData, slotlist } from '../NewGame/components/tempData';
import SlotItemCard from './components/item-card';

export default function Slot(){
    return(
        <div className='page-body'>
            <div className='landing-img'>
                <img src='/img/slot.png' alt='landingImage' />
            </div>
            
            <div className="newgame-title">
                <span className="page-title">SLOT</span>
            </div>
            
            <div className="newgame-items">
                {
                    newGamesData.map( ( item, index ) => (
                        <div className="newgame-item" key={ index }>
                            <span>{ item }</span>
                            <span>GAME SUPPLIER</span>
                        </div>
                    ) )
                }
            </div>
            <div className='slot-cards'>
                {
                    slotlist.map( ( item, index ) => ( 
                        <SlotItemCard image = { item } key = { index } />
                     ) )
                }
            </div>
        </div>
    )
}