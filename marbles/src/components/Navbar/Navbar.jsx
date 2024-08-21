import { Link } from "react-router-dom";

import { AuthedUserContext } from '../../App';
import { useContext } from 'react';


const Navbar = ({ handleSignout }) => {

    const user = useContext(AuthedUserContext);

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                { user ?
                <>
                    <li>
                        <Link to='/collectibles'>Collection</Link>
                    </li>
                    <li>
                    <Link to='' onClick={handleSignout}>
                        Sign Out
                    </Link>
                    </li>
                </>
                :
                <>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </>
            } 
            </ul>
        </nav>
    )
};

export default Navbar;