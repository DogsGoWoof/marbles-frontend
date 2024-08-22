import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

import * as collectibleService from '../../services/collectibleService';

import '../../assets/stylesheets/List.scss';


const CollectibleList = ({ collectibles }) => {

    const [collectiblesList, setCollectiblesList] = useState(collectibles);
    const [formData, setFormData] = useState({
        detail: 'id',
        order: 'asc',
    });

    const user = useContext(AuthedUserContext);

    const { profileId } = useParams() ? useParams() : user.profile_id;

    useEffect(() => {
        const fetchCollectorCollectibles = async () => {
            const collectiblesData = await collectibleService.index(profileId);
            // console.log('collectibles data', collectiblesData);
            setCollectiblesList(collectiblesData);
        };
        fetchCollectorCollectibles();
    }, []);

    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const orderList = (detail = 'id', order = 'asc') => {
        if (order === 'asc') {
            collectiblesList.sort((a, b) => a[detail] > b[detail]);
        }
        else if (order = 'desc') {
            collectiblesList.sort((a, b) => a[detail] < b[detail]);
        }
    }

    // call on Component render so state updates
    orderList(formData.detail, formData.order);

    const starRating = (rating) => {
        let stars = rating <= 5 ? `☆☆☆☆☆` : ``;
        const blackStar = /☆/
        if (rating <= 5) {
            for (let i = 0; i < rating; i++) stars = stars.replace(blackStar, '★');
        }
        else if (rating >= 11) {
            stars = `★ x ${rating}`
        }
        else {
            for (let i = 0; i < rating; i++) {
                stars += `★`;
                const allStars = stars.replace('\n', '');
                if (allStars.length % 5 === 0) {
                    stars += `\n`
                }
            }
        }
        return stars ? stars : '☆☆☆☆☆';
    };


    return (
        <>
            <main className="list-container">
                <div className="sort-selects">
                    <select
                        required
                        name="detail"
                        id="detail-input"
                        value={formData.detail}
                        onChange={handleChange}
                    >
                        <option value="" hidden></option>
                        <option value="name">Name</option>
                        <option value="rating">Rating</option>
                        <option value="count">Count</option>
                        <option value="condition">Condition</option>
                        <option value="date_obtained">Date Obtained</option>
                    </select>

                    <select
                        required
                        name="order"
                        id="order-input"
                        value={formData.order}
                        onChange={handleChange}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="collectible list">
                    {collectiblesList.map((collectible) => (
                        <Link key={collectible.id} to={`/collectibles/${collectible.id}`}>
                            <article className="list-item">
                                <div>
                                    <h2><ruby>{collectible.name}<rp>(</rp><rt>{collectible.condition}</rt><rp>)</rp></ruby></h2>
                                    <h4 className="star-rating">{starRating(collectible.rating)}</h4>
                                    {/* Change rating to use visual symbol like stars * rating value */}
                                </div>
                                <p className="collectible-count">x{collectible.count}</p>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )

}

export default CollectibleList;