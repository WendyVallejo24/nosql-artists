import React, { useState } from 'react';
import wow from '../img/wow.png';

function WowButton() {
    const [wows, setLikes] = useState(0);
    const [woww, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${woww ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(wows + 1);
                    setLiked(true);
                }}
            >
                <img src={wow} className='img' width={15} height={15} /> <br/>
                {wows} 
            </button>
        </div>
    );
}
export default WowButton