import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

import '../../assets/stylesheets/ProfileList.scss';
import ga from '../../assets/images/ga.svg';

const ProfileList = ({ profiles }) => {

    const [formData, setFormData] = useState({
        detail: 'id',
        order: 'asc',
    });

    const user = useContext(AuthedUserContext);

    const orderList = (detail, order = 'asc') => {
        if (order === 'asc') {
            profiles.sort((a, b) => a[detail] > b[detail]);
        }
        else if (order = 'desc') {
            profiles.sort((a, b) => a[detail] < b[detail]);
        }
    }

    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setFormData({ ...formData, [name]: value });
        orderList(formData.detail, formData.order);
    };

    const checkUser = () => {
        const head = document.querySelector('head');
        const styleEl = document.createElement('style');
        styleEl.id = 'a-disable';
        styleEl.innerText = '.list > a { pointer-events: none; color: gray; }';
        head.appendChild(styleEl);
        const styleElNode = document.getElementById('a-disable');
        user ? head.removeChild(styleElNode) : '';
    }

    orderList(formData.detail, formData.order);
    checkUser();


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
                        <option value="id" hidden></option>
                        <option value="name">Name</option>
                        <option value="collection">Collection</option>
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
                <div className="list profile-list">
                    {profiles.map((profile) => (
                        <Link key={profile.id} to={`/profiles/${profile.id}`}>
                            <article>
                                <div className="profile-card">
                                    {profile.image ?
                                        <img className="profile-list-image" src={profile.image} alt={`${profile.name}'s profile image.`} />
                                        :
                                        <img className="profile-list-image" src={ga} alt="Placeholder profile image." />
                                    }
                                    <div className="profile-card-details">
                                        <h2>{profile.name}</h2>
                                        <h4>Collects {profile.collection}</h4>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )

}

export default ProfileList;