import { Link } from "react-router-dom";

import { AuthedUserContext } from '../../App';
import { useContext } from 'react';


const Navbar = ({ handleSignout }) => {

    const user = useContext(AuthedUserContext);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                { user ?
                <>
                    { user.profile_id ?
                    <li>
                        <Link to={`profiles/${user.profile_id}`}>{ user.username }</Link>
                    </li>
                        :
                    <li>
                        <Link to={`profiles/create`}>{ user.username }</Link>
                    </li>
                    }
                    <li>
                        <Link to="/collectibles">Collection</Link>
                    </li>
                    <li>
                        <Link to="/collectibles/create">Add to Collection</Link>
                    </li>
                    <li>
                    <Link to="" onClick={handleSignout}>
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