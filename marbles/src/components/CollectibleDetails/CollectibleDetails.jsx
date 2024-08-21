import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as collectibleService from '../../services/collectibleService';


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
                <main >
                    { collectible.image ?
                        <img className="detail-image" src={collectible.image} alt={`User provided image of ${collectible.name}.`} />
                        :
                        <img src='' alt={`Placeholder for collectible.`}/>
                            // TO be replaced with Profile table value related to User for site theme settings
                    }
                    <h1>{collectible.name}</h1>
                    <h3>{collectible.condition}</h3>
                    <h3>{collectible.rating}</h3>
                    <h3>{collectible.count}</h3>
                    <h3>{collectible.date_obtained.slice(0, 16)}</h3>

                    {user.id === collectible.user_id ?
                        <>
                            <div className="collectible-actions">
                                <Link to={`/collectibles/${collectibleId}/edit`}>Edit</Link>
                                <button onClick={() => props.handleDeleteCollectible(collectibleId)}>Delete</button>
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