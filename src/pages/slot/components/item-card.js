import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";

export default function SlotItemCard( props ) {
    return(
        <div className="slot-item-card">
            <img src={ `/img/cards/${ props.image }` } alt="cardImage" />
            <div className="slot-item-card-hover">
                <FaRegPlayCircle />
            </div>
        </div>
    )
}