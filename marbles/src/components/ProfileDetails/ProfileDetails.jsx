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


    return (
        <>
            {profile ?
                profile.is_private && (!user || profile.user_id !== user.id) ?
                    <h1>Private Collection</h1>
                    :
                    <main className="profile-details">
                        <h1 className="profile-name">{profile.name}</h1>
                        {profile.image ?
                            <img className="profile-image" src={profile.image} alt={`User provided image of ${profile.name}.`} />
                            :
                            <img src='' alt={`Placeholder for profile.`} />
                        }

                        {/* Add column to profile model for about_me/collection_rant */}
                        {profile.about ?
                            <p className="profile-about">{profile.about}</p>
                            :
                            // <img src="https://i.redd.it/pbdg4l7i1a381.png" alt={`The Simpsons - "I just think they're neat!" meme.`} />
                            <iframe className="profile-about" width="560" height="315" src="https://www.youtube.com/embed/Y0PKG5-t3zU?si=CKEK8sdagTWJR7DU&v=50" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        }
                        {/* Add display for item set to profile as display_collectible/favourite_collectible */}
                        <h2 className="about">About Collection</h2>
                        {profile.favourite ?
                            <img className="profile-favourite" src={profile.favourite} alt={`${user.name}'s favourite piece of their ${profile.collection} collection.`} />
                            :
                            <img className="profile-favourite" src='https://assetsio.gnwcdn.com/pokemon-card-shiny-charizard.jpeg?width=848&quality=80&format=jpg&dpr=2&auto=webp' alt={`Placeholder for favourite collection piece.`} />
                        }

                        <Link to={`/profiles/${profile.id}/collectibles`}>
                            <h3 className="collection-link">{profile.name}'s {profile.collection} Collection</h3>
                        </Link>
                        {user ? user.id === profile.user_id ?
                            <>
                                <div className="profile-actions actions">
                                    <Link to={`/profiles/${profileId}/edit`}>Edit</Link>
                                    {/* <button className="delete" onClick={() => props.handleDeleteProfile(profileId)}>Delete</button>
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