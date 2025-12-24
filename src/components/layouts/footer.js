import React from 'react' ;
import { Link } from 'react-router-dom';

const data = [ 'Home', 'Live Casino', 'Promotions', 'Contact Us' ] ;

export default function Footer(){
    return(
        <div className='footer'>
            <div className='footer-logo'>
                <img src='/img/logo 2.png' alt='logo' />
                <img src = '/img/adult_only.svg' alt='adult_only' />
            </div>
            <div className='footer-links'>
                {
                    data.map( ( item, index ) => (
                        <Link className={ `footer-link ${ index < 3 ? 'verticalWall' : ''}` } key={ index }>
                            { item }
                        </Link>
                    ) )
                }
            </div>
            <div className='footer-others'>
                <img src='/img/image 2.png' alt='image2' />
            </div>
            <div className='footer-copyright'>
                @ 2025 BigWave Co.,Ltd
            </div>
        </div>
    )
}