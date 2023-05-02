import React, { useState } from 'react';
import care from '../img/care.png';

function CareButton() {
    const [cares, setLikes] = useState(0);
    const [cared, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${cared ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(cares + 1);
                    setLiked(true);
                }}
            >
                <img src={care} className='img' width={15} height={15} alt="" /> <br/>
                {cares} 
            </button>
        </div>
    );
}
export default CareButton
