import React, { useState } from 'react';
import love from '../img/love.png';

function LoveButton() {
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${loved ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(loves + 1);
                    setLiked(true);
                }}
            >
                <img src={love} className='img' width={15} height={15} /> <br/>
                {loves} 
            </button>
        </div>
    );
}
export default LoveButton