import React, { useState } from 'react';
import haha from '../img/haha.png';
import KafkaService from "./../../services/kafka.service";

function saveLike(e, status) {

    let data = {
        id: 0,
        status: status
    };

    console.log(JSON.stringify(data));

    KafkaService.reaction("haha");
    e.preventDefault();
}

function SadButton() {
    const [hahas, setLikes] = useState(0);
    const [hahad, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${hahad ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(hahas + 1);
                    setLiked(true);

                    e.preventDefault();
                    saveLike(e, 1)
                }}
            >
                <img src={haha} className='img' width={15} height={15} alt="" /> <br/>
                {hahas} 
            </button>
        </div>
    );
}
export default SadButton
