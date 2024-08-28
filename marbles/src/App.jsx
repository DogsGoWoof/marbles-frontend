import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//___Components___//
import Navbar from './components/Navbar/Navbar';
import SignForm from './components/Signin/SignForm';
import Landing from './components/Landing/Landing';
import Loading from './components/Loading/Loading';
//___Collectible Components___//
import CollectibleList from './components/CollectibleList/CollectibleList';
import CollectibleForm from './components/CollectibleForm/CollectibleForm';
import CollectibleDetails from './components/CollectibleDetails/CollectibleDetails';
//___Profile Components___//
import ProfileList from './components/ProfileList/ProfileList';
import ProfileForm from './components/ProfileForm/ProfileForm';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';

//___Services___//
import * as authService from '../src/services/authService';
import * as collectibleService from './services/collectibleService';
import * as profileService from '../src/services/profileService';

//___Context___//
export const AuthedUserContext = createContext(null);

//___Styles___//
import '../src/assets/stylesheets/App.scss';
import '../src/assets/stylesheets/Variables.scss';


const App = () => {

  const navigate = useNavigate();

  //___States___//
  const [user, setUser] = useState(authService.getUser());
  const [collectibles, setCollectibles] = useState([]);
  const [profiles, setProfiles] = useState([]);

  //___Effects___//
  useEffect(() => {
    const fetchAllCollectibles = async () => {
      const collectiblesData = await collectibleService.index();
      setCollectibles(collectiblesData);
    };
    if (user) fetchAllCollectibles();
  }, [user]);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      const profilesData = await profileService.index();
      setProfiles(profilesData);
    };
    fetchAllProfiles();
  }, [user]);


  //___Handlers___//
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  //___C(R)UD Handlers___//
  //___Collectible Handlers___///
  const handleCreateCollectible = async (collectibleFormData) => {
    const newCollectible = await collectibleService.create(collectibleFormData);
    setCollectibles([newCollectible, ...collectibles]);
    navigate('/collectibles');
  };

  const handleUpdateCollectible = async (collectibleId, collectibleFormData) => {
    const updatedCollectible = await collectibleService.update(collectibleId, collectibleFormData);
    setCollectibles(collectibles.map((collectible) => (parseInt(collectibleId) === collectible.id ? updatedCollectible : collectible)));
    navigate(`/collectibles/${collectibleId}`);
  };

  const handleDeleteCollectible = async (collectibleId) => {
    const deletedCollectible = await collectibleService.deleteCollectible(collectibleId);
    setCollectibles(collectibles.filter((collectible) => collectible.id !== deletedCollectible.id));
    navigate('/collectibles');
  };

  //___Profile Handlers___//
  const handleCreateProfile = async (profileFormData) => {
    const newProfile = await profileService.create(profileFormData);
    const userWithProfile = await authService.getUserWithProfileId();
    setUser(userWithProfile);
    setProfiles([newProfile, ...profiles]);
    navigate('/profiles');
  };

  const handleUpdateProfile = async (profileId, profileFormData) => {
    const updatedProfile = await profileService.update(profileId, profileFormData);
    setProfiles(profiles.map((profile) => (parseInt(profileId) === profile.id ? updatedProfile : profile)));
    navigate(`/profiles/${profileId}`);
  };

  //___Functions___//
  const orderList = (detail = 'id', order = 'asc', arr) => {
    if (order === 'asc') {
      arr.sort((a, b) => a[detail] > b[detail]);
    }
    else if (order = 'desc') {
      arr.sort((a, b) => a[detail] < b[detail]);
    }
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Navbar handleSignout={handleSignout} />
        <Routes>
          <Route path="/loading" element={<Loading />}/>
          <Route path="/" element={<Landing />} />
          <Route path='/profiles/:profileId/collectibles' element={<CollectibleList collectibles={[]} setCollectibles={setCollectibles} orderList={orderList} />} />
          {user ?
            <>
              <Route path='/collectibles' element={<CollectibleList collectibles={collectibles} orderList={orderList} />} />
              <Route path='/collectibles/create' element={<CollectibleForm handleCreateCollectible={handleCreateCollectible} />} />
              <Route path='/collectibles/:collectibleId' element={<CollectibleDetails handleDeleteCollectible={handleDeleteCollectible} />} />
              <Route path='/collectibles/:collectibleId/edit' element={<CollectibleForm handleUpdateCollectible={handleUpdateCollectible} />} />

              <Route path='/profiles' element={<ProfileList profiles={profiles} orderList={orderList} />} />
              <Route path='/profiles/create' element={< ProfileForm handleCreateProfile={handleCreateProfile} setUser={setUser} collectibles={collectibles} />} />
              <Route path='/profiles/:profileId' element={< ProfileDetails />} />
              <Route path='/profiles/:profileId/edit' element={< ProfileForm handleUpdateProfile={handleUpdateProfile} collectibles={collectibles} />} />
            </>
            :
            <>
              <Route path='/profiles' element={<ProfileList profiles={profiles} orderList={orderList} />} />
              <Route path="/signup" element={<SignForm setUser={setUser} navigate={navigate} formType='signup' />} />
              <Route path="/signin" element={<SignForm setUser={setUser} navigate={navigate} formType='signin' />} />
            </>
          }
        </Routes>
      </AuthedUserContext.Provider>
    </>
  )
};

export default App;