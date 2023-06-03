import React, { useEffect, useState } from 'react';
import care from '../img/care.png';
import KafkaService from "./../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';
const MongoDBService = require('../../services/MongoDb.service');


function CareButton({ pubId }) {
    const { user } = useAuth();
    const [cares, setLikes] = useState(0);
    const [cared, setLiked] = useState(false);

    useEffect(() => {
        const mongoDBService = new MongoDBService('http://localhost:3001');

        const objectId = pubId;
        const reactionId = 'care';

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

    function saveLike(e) {
        const uId = user.uid;
        const oId = pubId;
        const rId = "care"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }

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
                <img src={care} className='img' width={15} height={15} alt="" /> <br />
                {cares}
            </button>
        </div>
    );

}
export default CareButton