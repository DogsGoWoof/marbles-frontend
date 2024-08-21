import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//___Components___//
import Navbar from './components/Navbar/Navbar';
import SignForm from './components/Signin/SignForm';
import CollectibleList from './components/CollectibleList/CollectibleList';
import CollectibleForm from './components/CollectibleForm/CollectibleForm';
import CollectibleDetails from './components/CollectibleDetails/CollectibleDetails';

//___Services___//
import * as authService from '../src/services/authService';
import * as collectibleService from './services/collectibleService';

//___Context___//
export const AuthedUserContext = createContext(null);

const App = () => {

  const navigate = useNavigate();
    // Assigned to variable be used in passed props to child Components
      // Otherwise hook call becomes invalid

  //___States___//
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [collectibles, setCollectibles] = useState([]);

  //___Effects___//
  useEffect(() => {
    const fetchAllCollectibles = async () => {
      const collectiblesData = await collectibleService.index();
      setCollectibles(collectiblesData);
    };
    if (user) fetchAllCollectibles();
  }, [user]);

  //___Handlers___//
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

    //___C(R)UD Handlers___//
  const handleCreateCollectible = async (collectibleFormData) => {
    const newCollectible = await collectibleService.create(collectibleFormData);
    console.log(newCollectible);
    setCollectibles([newCollectible, ...collectibles]);
    navigate('/collectibles');
  };

  const handleUpdateCollectible = async (collectibleId, collectibleFormData) => {
    const updatedCollectible = await collectibleService.update(collectibleId, collectibleFormData);
    console.log(updatedCollectible);

    setCollectibles(collectibles.map((collectible) => (parseInt(collectibleId) === collectible.id ? updatedCollectible : collectible)));

    navigate(`/collectibles/${collectibleId}`);
  };

  const handleDeleteCollectible = async (collectibleId) => {
    const deletedCollectible = await collectibleService.deleteCollectible(collectibleId);
    setCollectibles(collectibles.filter((collectible) => collectible.id !== deletedCollectible.id));
    navigate('/collectibles');
  };

    return (
      <>
        <h1>Hello, World!</h1>
        <AuthedUserContext.Provider value={user}>
          <Navbar handleSignout={handleSignout} />
          <Routes>
            {user ?
              <>
                <Route path='/hello' element={<h1>World</h1>} />
                <Route path='/collectibles' element={<CollectibleList collectibles={collectibles} />} />
                <Route path='/collectibles/create' element={<CollectibleForm handleCreateCollectible={handleCreateCollectible} />} />
                <Route path='/collectibles/:collectibleId' element={<CollectibleDetails handleDeleteCollectible={handleDeleteCollectible} />}/>
              </>
              :
              <>
                <Route path="/signup" element={<SignForm setUser={setUser} formType='signup' />} />
                <Route path="/signin" element={<SignForm setUser={setUser} formType='signin' />} />
              </>
            }
          </Routes>
        </AuthedUserContext.Provider>
      </>
    )
  }

  export default App;