import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthedUserContext } from '../../App';

import * as profileService from '../../services/profileService';


const ProfileDetails = (props) => {

    const [profile, setProfile] = useState(null);

    const user = useContext(AuthedUserContext);

    const { profileId } = useParams();
    
    useEffect(() => {
        const fetchProfile = async () => {
            const [profileData] = await profileService.show(profileId);
            console.log(profileData);
            setProfile(profileData);
        };
        fetchProfile();
    }, [profileId]);


    return (
        <>
            { profile ?
                profile.is_private && profile.user_id !== user.id ? 
                    <h1>Private Collection</h1> 
                    :
                    <main >
                        <h1 className="profile-name">{profile.name}</h1>
                    { profile.image ?
                        <img className="profile-image" src={profile.image} alt={`User provided image of ${profile.name}.`} />
                        :
                        <img src='' alt={`Placeholder for profile.`}/>
                    }

                    {/* Add column to profile model for about_me/collection_rant */}
                    {/* Add display for item set to profile as display_collectible/favourite_collectible */}

                    <Link to={`/profiles/${profile.id}/collectibles`}>
                        <h3>{profile.name}'s {profile.collection} Collection</h3>
                    </Link>
                    {user ? user.id === profile.user_id ?
                        <>
                            <div className="profile-actions">
                                <Link to={`/profiles/${profileId}/edit`}>Edit</Link>
                                {/* <button onClick={() => props.handleDeleteProfile(profileId)}>Delete</button>
                                    Leaving in for now for convenient superfluous profile creation handling
                                */}
                            </div>
                        </> 
                        : 
                        '' : ''
                    }
                    </main>
                :
                <>Loading</>
            }
        </>
    );

};

export default ProfileDetails;