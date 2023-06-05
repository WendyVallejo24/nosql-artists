import React, { useEffect, useState } from 'react';
import love from '../img/love.png';
import KafkaService from "./../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';
const MongoDBService = require('../../services/MongoDb.service');

function LoveButton({ pubId }) {
    const { user } = useAuth();
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);

    useEffect(() => {
        const mongoDBService = new MongoDBService('http://localhost:3001');

        const objectId = pubId;
        const reactionId = 'love';

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
        const rId = "like"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }

    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${loved ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(loves + 1);
                    setLiked(true);

                    e.preventDefault();
                    saveLike(e, 1)
                }}
            >
                <img src={love} className='img' width={15} height={15} alt="" /> <br />
                {loves}
            </button>
        </div>
    );
}
export default LoveButton