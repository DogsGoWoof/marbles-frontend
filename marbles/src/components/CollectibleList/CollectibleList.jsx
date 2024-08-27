import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

import * as collectibleService from '../../services/collectibleService';

import '../../assets/stylesheets/CollectibleList.scss';
import fopiiho1 from '../../assets/images/fopiiho1.png';
import fopiiho2 from '../../assets/images/fopiiho2.png';
import alpha from '../../assets/images/alpha.png';


const CollectibleList = ({ collectibles, orderList }) => {

    const [collectiblesList, setCollectiblesList] = useState(collectibles);
    const [formData, setFormData] = useState({
        detail: 'id',
        order: 'asc',
    });
    const [search, setSearch] = useState('');

    const user = useContext(AuthedUserContext);

    const { profileId } = useParams() ? useParams() : user.profile_id ? user.profile_id : null;
    // change back end to return profile.favourite value to add marker to the item in the list
    useEffect(() => {
        const fetchCollectorCollectibles = async () => {
            const collectiblesData = await collectibleService.index(profileId);
            setCollectiblesList(collectiblesData);
        };
        fetchCollectorCollectibles();
    }, [profileId]);

    const reFetchCollectibles = async () => {
        const collectiblesData = await collectibleService.index(profileId);
        setCollectiblesList(collectiblesData);
    };

    const searchFunc = (arr) => {
        const filteredList = arr.filter(item => item.name.includes(search));
        setCollectiblesList(filteredList)
    };

    const handleChange = (evt) => {
        const inputType = evt.target.localName;
        const value = evt.target.value;
        if (inputType === 'select') {
            const name = evt.target.name;
            setFormData({ ...formData, [name]: value });
        }
        if (inputType === 'input') {
            setSearch(value);
            if (!value) {
                profileId ? user.profile_id === profileId ? setCollectiblesList(collectibles) : reFetchCollectibles() : setCollectiblesList(collectibles);
            };
        }
    };

    const collectibleCount = () => {
        let total = 0;
        collectiblesList.map(collectible => total += collectible.count);
        return total;
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

    const searchEl = document.getElementById('search');
    if (searchEl) {
        searchEl.addEventListener("keypress", (evt) => {
            if (evt.key === 'Enter') {
                searchFunc(collectiblesList);
                searchEl.disabled = true;
                setTimeout(() => {
                    searchEl.disabled = false
                    searchEl.focus();
                }, 150);
            };
        })
    }

    if (collectiblesList[0]?.is_private && profileId && user.profile_id !== parseInt(profileId)) {
        return <h1>Private Collection</h1>
    };

    orderList(formData.detail, formData.order, collectiblesList);


    return (
        <>
            <main className="list-container">
                <div className="sort-selects">
                    <input type="search"
                        name="search"
                        id="search"
                        value={search}
                        onChange={handleChange}
                        placeholder="Search by name"
                    />
                    <select
                        required
                        name="detail"
                        id="detail-input"
                        value={formData.detail}
                        onChange={handleChange}
                    >
                        <option value="id" hidden></option>
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

                <div className="collection-stats">
                    <h4 className="stat-name">Unique Units: <span className="stat-number">{collectiblesList.length}</span></h4>
                    <h4 className="stat-name">Cumulative Collection Count: <span className="stat-number">{collectibleCount()}</span></h4>
                </div>

                <div className={`collectible list ${user ? 'enabled' : 'disabled'}`}>
                    {collectiblesList.map((collectible) => (
                        <Link key={collectible.id} to={user ? `/collectibles/${collectible.id}` : ''}>
                            <article className="list-item">
                                <div className="collectible-list-details">
                                    <div className="collectible-name-container">
                                        <h2 className="collectible-name"><ruby>{collectible.name.length > 10 ? collectible.name.slice(0, 10) + '...' : collectible.name}<rp>(</rp><rt className="collectible-list-condition">{collectible.condition}</rt><rp>)</rp></ruby></h2>
                                    </div>
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