import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HackDetail = () => {
    const { id } = useParams();
    const [mainEntity, setMainEntity] = useState(null);
    const [relatedEntities, setRelatedEntities] = useState([]);

    useEffect(() => {
        const fetchEntityDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/entity/${id}`);
                setMainEntity(response.data.mainEntity);
                setRelatedEntities(response.data.relatedEntities);
            } catch (error) {
                console.error('Error fetching entity details:', error);
            }
        };
        fetchEntityDetails();
    }, [id]);

    const loadMore = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/entity/${id}`);
            setRelatedEntities((prev) => [...prev, ...response.data.relatedEntities]);
        } catch (error) {
            console.error('Error fetching more entities:', error);
        }
    };

    return (
        <div>
            {mainEntity && (
                <div>
                    <h1>{mainEntity.title}</h1>
                    <p>{mainEntity.description}</p>
                    <img src={mainEntity.imageUrl} alt={mainEntity.title} width="300" />
                </div>
            )}

            <h2>Related Entities</h2>
            <div>
                {relatedEntities.map((entity) => (
                    <div key={entity._id} style={{ marginBottom: '20px' }}>
                        <h3>{entity.title}</h3>
                        <p>{entity.description}</p>
                        <img src={entity.imageUrl} alt={entity.title} width="200" />
                    </div>
                ))}
            </div>

            <button onClick={loadMore}>Load More</button>
        </div>
    );
};

export default HackDetail;
