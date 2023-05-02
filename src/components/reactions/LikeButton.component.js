import React, { useState } from 'react';
import like from '../img/like.png';

function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${liked ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(likes + 1);
                    setLiked(true);
                }}
            >
                <img src={like} className='img' width={15} height={15} alt="" /> <br/>
                {likes} 
            </button>
        </div>
    );
}
export default LikeButton
