import React, { useState } from 'react';
import like from '../img/like.png';
import KafkaService from "./../../services/kafka.service";

function saveLike(e, status) {

    let data = {
        id: 0,
        status: status
    };

    console.log(JSON.stringify(data));

    KafkaService.reaction("like");
    e.preventDefault();
}

function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${liked ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(likes + 1);
                    setLiked(true);

                    e.preventDefault();
                    saveLike(e, 1)
                }
            }>
                <img src={like} className='img' width={15} height={15} alt="" /> <br />
                {likes}
            </button>

        </div>
    );
}

export default LikeButton
