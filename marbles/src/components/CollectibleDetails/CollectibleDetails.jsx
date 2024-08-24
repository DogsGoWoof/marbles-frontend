import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as collectibleService from '../../services/collectibleService';

import '../../assets/stylesheets/CollectibleDetails.scss';


const CollectibleDetails = (props) => {

    const [collectible, setCollectible] = useState(null);

    const user = useContext(AuthedUserContext);

    const { collectibleId } = useParams();
    useEffect(() => {
        const fetchCollectible = async () => {
            const [collectibleData] = await collectibleService.show(collectibleId);
                // needed to destructure returned list from Flask backend
            setCollectible(collectibleData);
        };
        fetchCollectible();
    }, [collectibleId]);


    return (
        <>
            {collectible ?
                <main className="collectible-details">
                    { collectible.image ?
                        <img className="collectible-image" src={collectible.image} alt={`User provided image of ${collectible.name}.`} />
                        :
                        <img className="collectible-image" src='https://cdn.inspireuplift.com/uploads/images/seller_products/1689756971_03.png' alt={`Placeholder for collectible.`}/>
                            // To be replaced with Profile table value related to User for site theme settings
                    }
                    <h1 className="collectible-name">{collectible.name}</h1>
                    <h3 className="collectible-condition">Condition: {collectible.condition}</h3>
                    <h3 className="collectible-rating">Rating: {collectible.rating}</h3>
                    <h3 className="collectible-count">Count: {collectible.count}</h3>
                    <h3 className="collectible-date">Date Obtained: {collectible.date_obtained.slice(0, 16)}</h3>

                    {user.id === collectible.user_id ?
                        <>
                            <div className="collectible-actions actions">
                                <Link to={`/collectibles/${collectibleId}/edit`}>Edit</Link>
                                <button className="delete" onClick={() => props.handleDeleteCollectible(collectibleId)}>Delete</button>
                            </div>
                        </>
                        : null
                    }
                </main>
                :
                <>Loading</>
            }
        </>
    );

};

export default CollectibleDetails;