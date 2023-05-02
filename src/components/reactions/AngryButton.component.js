import React, { useState } from 'react';
import angry from '../img/angry.png';

function AngryButton() {
    const [angries, setLikes] = useState(0);
    const [angried, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${angried ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(angries + 1);
                    setLiked(true);
                }}
            >
                <img src={angry} className='img' width={15} height={15} /> <br/>
                {angries} 
            </button>
        </div>
    );
}
export default AngryButton