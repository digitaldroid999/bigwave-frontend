// import React from "react";

export default function PlayButton( props ){
    return(
        <div className="btn_playButton" onClick={ () => { props.action() } }>
            <div className={ props.type === 'grey' ? 'btn_playButton_shape_disable' : "btn_playButton_shape" }></div>
            { props.title }
        </div>
    )
}