import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ProfileList = ({ profiles }) => {

    const [formData, setFormData] = useState({
        detail: 'id',
        order: 'asc',
    });

    const orderList = (detail, order = 'asc') => {
        if (order === 'asc') {
            profiles.sort((a, b) => a[detail] > b[detail]);
        }
        else if (order = 'desc') {
            profiles.sort((a, b) => a[detail] < b[detail]);
        }
    }

    orderList(formData.detail, formData.order);


    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(value)
        // console.log(evt.target.value)
        setFormData({ ...formData, [name]: value });
        orderList(formData.detail, formData.order);
    };


    return (
        <>
            <main>
                <select
                    required
                    name="detail"
                    id="detail-input"
                    value={formData.detail}
                    onChange={handleChange}
                    >
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
                {profiles.map((profile) => (
                    <Link key={profile.id} to={`/profiles/${profile.id}`}>
                        <article>
                            <div>
                                <h2>{profile.name}</h2>
                                <h4>Collects {profile.collection}</h4>
                            </div>
                        </article>
                    </Link>
                ))}
            </main>
        </>
    )

}

export default ProfileList;