import React, { useState } from 'react';
import sad from '../img/sad.png';

function SadButton() {
    const [sads, setLikes] = useState(0);
    const [saded, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${saded ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(sads + 1);
                    setLiked(true);
                }}
            >
                <img src={sad} className='img' width={15} height={15} /> <br/>
                {sads} 
            </button>
        </div>
    );
}
export default SadButton