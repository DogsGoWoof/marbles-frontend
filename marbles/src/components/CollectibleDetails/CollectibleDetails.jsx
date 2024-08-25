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
            setCollectible(collectibleData);
        };
        fetchCollectible();
    }, [collectibleId]);


    return (
        <>
            {collectible ?
                <main className="collectible-details">
                    <div className="collectible-name-image column">
                        <h1 className="collectible-name">{collectible.name}</h1>
                        {collectible.image ?
                            <img className="collectible-image" src={collectible.image} alt={`User provided image of ${collectible.name}.`} />
                            :
                            <img className="collectible-image" src='https://cdn.inspireuplift.com/uploads/images/seller_products/1689756971_03.png' alt={`Placeholder for collectible.`} />
                            // To be replaced with Profile table value related to User for site theme settings
                        }
                    </div>

                    <div className="collectible-details-info column">
                        <h3 className="collectible-condition">Condition: <span className="collectible-info">{collectible.condition}</span></h3>
                        <h3 className="collectible-rating">Rating: <span className="collectible-info">{collectible.rating}</span></h3>
                        <h3 className="collectible-count">Count: <span className="collectible-info">{collectible.count}</span></h3>
                        <h3 className="collectible-date">Date Obtained: <span className="collectible-info">{collectible.date_obtained.slice(0, 16)}</span></h3>
                    </div>

                    {user.id === collectible.user_id ?
                        <>
                            <div className="collectible-actions actions">
                                <Link className="edit" to={`/collectibles/${collectibleId}/edit`}>Edit</Link>
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