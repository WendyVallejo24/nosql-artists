import React, { useEffect, useState } from 'react';
import sad from '../img/sad.png';
import KafkaService from "./../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';
const MongoDBService = require('../../services/MongoDb.service');



function SadButton({ pubId }) {
    const { user } = useAuth();
    const [sads, setLikes] = useState(0);
    const [saded, setLiked] = useState(false);

    useEffect(() => {
        const mongoDBService = new MongoDBService('http://localhost:3001');

        const objectId = pubId;
        const reactionId = 'sad';

        const fetchData = async () => {
            try {
                const response = await mongoDBService.getReactionsByObjectAndReaction(objectId, reactionId);
                const data = response[0];
                if (data) {
                    setLikes(data.n);
                    console.log(data.n);
                } else {
                    setLikes(0);
                }
                //setLikes(data.n);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    })

    function saveLike(e, status) {
        const uId = user.uid;
        const oId = pubId;
        const rId = "sad"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }

    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${saded ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(sads + 1);
                    setLiked(true);

                    e.preventDefault();
                    saveLike(e, 1)
                }}
            >
                <img src={sad} className='img' width={15} height={15} alt="" /> <br />
                {sads}
            </button>
        </div>
    );
}
export default SadButton