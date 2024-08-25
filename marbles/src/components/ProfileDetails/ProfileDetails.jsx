import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthedUserContext } from '../../App';

import * as profileService from '../../services/profileService';

import '../../assets/stylesheets/ProfileDetails.scss';

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

    if (!profile) return <>loading</>

    let profileFavourite;
    const findFavourite = (collectibles) => {
        return props.collectibles.filter(collectible => collectible.id === profile?.favourite)
    }

    [profileFavourite] = profile?.favourite ? findFavourite(props.collectibles) : [{}];

    return (
        <>
            {profile ?
                profile.is_private && (!user || profile.user_id !== user.id) ?
                    <h1>Private Collection</h1>
                    :
                    <main className="profile-details">
                        <div className="profile-column column-1">
                            <h1 className="profile-name header">{profile.name}</h1>
                            {profile.image ?
                                <div className="profile-image-container">
                                    <img className="profile-image" src={profile.image} alt={`User provided image of ${profile.name}.`} />
                                </div>
                                :
                                <img className="profile-image" src="https://www.org4life.com/wp-content/uploads/2013/08/Packrat.gif" alt={`Pack rat looking at the photographer from a hole in a tree. Placeholder image for profile.`} />
                            }
                            {user ? user.id === profile.user_id ?
                                <>
                                    <div className="profile-actions actions">
                                        <Link to={`/profiles/${profileId}/edit`}>Edit</Link>
                                    </div>
                                </>
                                :
                                '' : ''
                            }
                        </div>

                        <div className="profile-column column-2">
                            <h2 className="header">Collection</h2>

                            <h3 className="collection-link">
                                <Link to={`/profiles/${profile.id}/collectibles`}>
                                    {profile.name}'s {profile.collection} Collection
                                </Link>
                            </h3>

                            {profile.favourite ?
                                <div className="profile-favourite">
                                    <h2>{profileFavourite?.condition} condition {profileFavourite?.name}</h2>
                                    <img className="profile-favourite-image" src={profileFavourite?.image} alt={`${profile.name}'s favourite piece of their ${profile.collection} collection.`} />
                                </div>
                                :
                                <div className="profile-favourite">
                                    <img className="profile-favourite-image" src='https://assetsio.gnwcdn.com/pokemon-card-shiny-charizard.jpeg?width=848&quality=80&format=jpg&dpr=2&auto=webp' alt={`Placeholder for favourite collection piece.`} />
                                </div>
                            }
                        </div>

                        <div className="profile-column column-3">
                            <h2 className="header">About Collection</h2>
                            {profile.about ?
                                <div className="about">
                                    <p className="profile-about">{profile.about}</p>
                                </div>
                                :

                                <div className="about">
                                    <img className="profile-about" src="https://i.redd.it/pbdg4l7i1a381.png" alt={`The Simpsons - "I just think they're neat!" meme.`} />
                                </div>
                            }

                        </div>

                    </main >
                :
                <>Loading</>
            }
        </>
    );

};

export default ProfileDetails;