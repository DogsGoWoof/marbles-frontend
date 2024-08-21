import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//___Context___//
export const AuthedUserContext = createContext(null);

const App = () => {


  return (
    <>
    <h1>Hello, World!</h1>
      {/* <AuthedUserContext.Provider> */}
        {/* <Navbar /> */}
        <Routes>

        </Routes>
      {/* </AuthedUserContext.Provider> */}
    </>
  )
}

export default App;