import React, { useState } from 'react';
import care from '../img/care.png';
import KafkaService from "./../../services/kafka.service";

function saveLike(e, status) {

    let data = {
        id: 0,
        status: status
    };

    console.log(JSON.stringify(data));

    KafkaService.reaction("care");
    e.preventDefault();
}

function CareButton() {
    const [cares, setLikes] = useState(0);
    const [cared, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${cared ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(cares + 1);
                    setLiked(true);

                    e.preventDefault();
                    saveLike(e, 1)
                }}
            >
                <img src={care} className='img' width={15} height={15} alt="" /> <br/>
                {cares} 
            </button>
        </div>
    );
}
export default CareButton
