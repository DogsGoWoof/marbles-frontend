import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

import * as collectibleService from '../../services/collectibleService';

import '../../assets/stylesheets/CollectibleList.scss';
import fopiiho1 from '../../assets/images/fopiiho1.png';
import fopiiho2 from '../../assets/images/fopiiho2.png';
import alpha from '../../assets/images/alpha.png';


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

    const starRating = (rating) => {
        let stars = rating <= 5 ? `☆☆☆☆☆` : ``;
        const blackStar = /☆/
        if (Math.abs(rating) <= 5) {
            for (let i = 0; i < Math.abs(rating); i++) stars = stars.replace(blackStar, '★');
        }
        else if (Math.abs(rating) >= 6) {
            stars = `★ x ${Math.abs(rating)}`
        }
        return stars ? stars : '☆☆☆☆☆';
    };

    const [...fopphi] = document.getElementsByClassName('ioiho');
    fopphi.map(image => {
        image.addEventListener('pointerover', () => {
            image.src = fopiiho2;
        });
    });

    // JS to disable list links when no user is logged in
    const checkUser = () => {
        const head = document.querySelector('head');
        const styleEl = document.createElement('style');
        styleEl.id = 'a-disable';
        styleEl.innerText = '.list > a { pointer-events: none; color: gray; }';
        head.appendChild(styleEl);
        const styleElNode = document.getElementById('a-disable');
        user ? head.removeChild(styleElNode) : '';
    }

    if (collectiblesList[0]?.is_private && profileId && user.profile_id !== parseInt(profileId)) {
        return <h1>Private Collection</h1>
    };
    orderList(formData.detail, formData.order);
    checkUser(); // Needs a check for when redirected from login else the page needs to be reloaded


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
                        <Link key={collectible.id} to={`/collectibles/${collectible.id}`} >
                            <article className="list-item">
                                <div className="collectible-list-details">
                                    <h2><ruby>{collectible.name}<rp>(</rp><rt className="collectible-list-condition">{collectible.condition}</rt><rp>)</rp></ruby></h2>
                                    {collectible.rating >= 0 ?
                                        <h4 className="star-rating">{starRating(collectible.rating)}</h4>
                                        :
                                        <h4 className="star-rating negative-rating">{starRating(collectible.rating)}</h4>
                                    }
                                    <p className="collectible-count">x{collectible.count}</p>
                                </div>
                                {collectible.image ?
                                    <img className="collectible-list-image" src={collectible.image} alt={`User provided linked image of ${collectible.name}`} />
                                    :
                                    collectible.count <= 0 ?
                                        <img className="placeholder-image ioiho collectible-list-image" src={fopiiho1} alt={`Placeholder image when colelctible count is 0. Fairly Odd Parents - If I had one! meme.`} />
                                        :
                                        <img className="placeholder-image collectible-list-image" src={alpha} alt={`Placeholder image of a marble.`} />
                                }
                            </article>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )

}

export default CollectibleList;