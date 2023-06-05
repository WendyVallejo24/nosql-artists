import React, { useEffect, useState } from 'react';
import angry from '../img/angry.png';
import KafkaService from "./../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';
const MongoDBService = require('../../services/MongoDb.service');

function AngryButton({ pubId }) {
    const { user } = useAuth();
    const [angries, setLikes] = useState(0);
    const [angried, setLiked] = useState(false);

    useEffect(() => {
        const mongoDBService = new MongoDBService('http://localhost:3001');

        const objectId = pubId;
        const reactionId = 'angry';

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
        const rId = "angry"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }

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
                <img src={angry} className='img' width={15} height={15} alt="" /> <br />
                {angries}
            </button>
        </div>
    );
}
export default AngryButton