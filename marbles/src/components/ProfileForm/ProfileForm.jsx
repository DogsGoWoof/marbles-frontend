import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as profileService from '../../services/profileService';

import '../../assets/stylesheets/ProfileForm.scss';


const ProfileForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        collection: '',
        about: '',
        favourite: props.collectibles[0]?.id ? props.collectibles[0].id : 0,
        is_private: true,
    });

    const { profileId } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            const [profileData] = await profileService.show(profileId);
            setFormData(profileData);
        };
        if (profileId) fetchProfile();
    }, [profileId]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (profileId) {
            props.handleUpdateProfile(profileId, formData);
        } else {
            props.handleCreateProfile(formData);
        }
    };


    return (
        <main>
            <form onSubmit={handleSubmit}>
                <fieldset className="form profile-form" >
                    <legend><h1>{profileId ? 'Edit Profile' : 'Create Profile'}</h1></legend>
                    <label htmlFor="name-input">Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        id="name-input"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="image-input">Profile Image</label>
                    <input
                        type="text"
                        name="image"
                        id="image-input"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <label htmlFor="collection-input">Collection</label>
                    <input
                        type="text"
                        name="collection"
                        id="collection-input"
                        value={formData.collection}
                        onChange={handleChange}
                    />
                    <label htmlFor="about-input">About</label>
                    <textarea
                        type="text"
                        name="about"
                        id="about-input"
                        value={formData.about}
                        onChange={handleChange}
                    ></textarea>
                    <label htmlFor="favourite-input">Favourite</label>
                    <select
                        name="favourite"
                        id="favourite"
                        value={formData.favourite}
                        onChange={handleChange}
                    >
                        <option value="0" hidden></option>
                        {props.collectibles.map(collectible => <option key={collectible.id} value={collectible.id}>{collectible.name}</option>)}
                    </select>
                    <label htmlFor="is_private-input">Privacy Setting</label>
                    <select
                        name="is_private"
                        id="is_private-input"
                        value={formData.is_private}
                        onChange={handleChange}
                    >
                        <option value={true}>Private</option>
                        <option value={false}>Public</option>
                    </select>
                    <button type="submit">SUBMIT</button>
                </fieldset>
            </form>
        </main>
    );
};

export default ProfileForm;
