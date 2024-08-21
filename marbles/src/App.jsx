import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//___Components___//
import Navbar from './components/Navbar/Navbar';
import SignForm from './components/Signin/SignForm';
import CollectibleList from './components/CollectibleList/CollectibleList';

//___Services___//
import * as authService from '../src/services/authService'; // import the authservice
import * as collectibleService from './services/collectibleService';

//___Context___//
export const AuthedUserContext = createContext(null);

const App = () => {

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


  return (
    <>
      <h1>Hello, World!</h1>
      <AuthedUserContext.Provider value={user}>
        <Navbar handleSignout={handleSignout} />
        <Routes>
          {user ? 
          <>
            <Route path='/hello' element={<h1>World</h1>}>Word</Route>
            <Route path='/collectibles' element={<CollectibleList collectibles={collectibles} />}></Route>
          </> 
          :
            <>
              <Route path="/signup" element={<SignForm setUser={ setUser } formType='signup' />} />
              <Route path="/signin" element={<SignForm setUser={ setUser } formType='signin' />} />
            </>
          }
        </Routes>
      </AuthedUserContext.Provider>
    </>
  )
}

export default App;