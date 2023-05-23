import React, { useState } from 'react';
import angry from '../img/angry.png';
import KafkaService from "./../../services/kafka.service";

function saveLike(e, status) {

    let data = {
        id: 0,
        status: status
    };

    console.log(JSON.stringify(data));

    KafkaService.reaction("angry");
    e.preventDefault();
}

function AngryButton() {
    const [angries, setLikes] = useState(0);
    const [angried, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${angried ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(angries + 1);
                    setLiked(true);

                    e.preventDefault();
                    saveLike(e, 1)
                }}
            >
                <img src={angry} className='img' width={15} height={15} alt="" /> <br/>
                {angries} 
            </button>
        </div>
    );
}
export default AngryButton
