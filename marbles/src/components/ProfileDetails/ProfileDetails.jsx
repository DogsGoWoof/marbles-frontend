import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as profileService from '../../services/profileService';


const ProfileDetails = (props) => {

    const [profile, setProfile] = useState(null);

    const user = useContext(AuthedUserContext);

    const { profileId } = useParams();
    useEffect(() => {
        const fetchProfile = async () => {
            const [profileData] = await profileService.show(profileId);
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
                        <h1>{profile.name}</h1>
                    { profile.image ?
                        <img className="detail-image" src={profile.image} alt={`User provided image of ${profile.name}.`} />
                        :
                        <img src='' alt={`Placeholder for profile.`}/>
                    }
                    <h3>{profile.name}'s {profile.collection} Collection</h3>

                    {user.id === profile.user_id ?
                        <>
                            <div className="profile-actions">
                                <Link to={`/profiles/${profileId}/edit`}>Edit</Link>
                                <button onClick={() => props.handleDeleteProfile(profileId)}>Delete</button>
                            </div>
                        </> 
                        : 
                        ''
                    }
                    </main>
                :
                <>Loading</>
            }
        </>
    );

};

export default ProfileDetails;