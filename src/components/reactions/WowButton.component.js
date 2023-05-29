import React, { useState } from 'react';
import wow from '../img/wow.png';
import KafkaService from "./../../services/kafka.service";

function saveLike(e, status) {

    let data = {
        id: 0,
        status: status
    };

    console.log(JSON.stringify(data));

    KafkaService.reaction("wow");
    e.preventDefault();
}

function WowButton() {
    const [wows, setLikes] = useState(0);
    const [woww, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${woww ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(wows + 1);
                    setLiked(true);

                    e.preventDefault();
                    saveLike(e, 1)
                }}
            >
                <img src={wow} className='img' width={15} height={15} alt="" /> <br/>
                {wows} 
            </button>
        </div>
    );
}
export default WowButton
