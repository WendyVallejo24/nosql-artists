import React, { useState } from 'react';
import haha from '../img/haha.png';

function SadButton() {
    const [hahas, setLikes] = useState(0);
    const [hahad, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${hahad ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(hahas + 1);
                    setLiked(true);
                }}
            >
                <img src={haha} className='img' width={15} height={15} /> <br/>
                {hahas} 
            </button>
        </div>
    );
}
export default SadButton