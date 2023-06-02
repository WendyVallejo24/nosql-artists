import React, { useEffect, useState } from 'react';
import wow from '../img/wow.png';
import KafkaService from "./../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';
const MongoDBService = require('../../services/MongoDb.service');

function WowButton({ pubId }) {
    const { user } = useAuth();
    const [wows, setLikes] = useState(0);
    const [woww, setLiked] = useState(false);

    useEffect(() => {
        const mongoDBService = new MongoDBService('http://localhost:3001');

        const objectId = pubId;
        const reactionId = 'wow';

        const fetchData = async () => {
            try {
                const response = await mongoDBService.getReactionsByObjectAndReaction(objectId, reactionId);
                const data = response[0];
                setLikes(data.n);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    })

    function saveLike(e, status) {
        const uId = user.uid;
        const oId = pubId;
        const rId = "wow"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }

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
                <img src={wow} className='img' width={15} height={15} alt="" /> <br />
                {wows}
            </button>
        </div>
    );
}
export default WowButton