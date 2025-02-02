import './styles/Card.css';
import { useState, useRef } from 'react';

function Card({card, onClick, isclicked, onTransitionEnd, style}) 
{
    const cardRef = useRef(null);

    const cardStyle = {
        backgroundColor: "var(--dark)",
        border: "3px double var(--orange)"
    }

    function openCard(event) {
        if(onClick && !isclicked) {
            onClick(event);
        }
    }
    
    function handleAnimationEnd()
    {
        setClicked(false);
    }

    //make sure to clear handleClicked when exiting card
    return(
        <div className={`card ${isclicked ? 'card-clicked' : ''}`} onClick={openCard} isclicked={isclicked} onTransitionEnd={onTransitionEnd} style={style}>
            <div className="card-title">{card.title}</div>
            <div className="card-description">{card.description}</div>
        </div>
    );  
}
export default Card;