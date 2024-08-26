import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';

import '../../assets/stylesheets/Navbar.scss';
import marble1 from '../../assets/images/marble1.svg';

const Navbar = ({ handleSignout }) => {

    const user = useContext(AuthedUserContext);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <div className="logo-container">
                            <img className="logo" src={marble1} alt="marbles logo"></img>
                            <p>marbles</p>
                        </div>
                    </Link>
                </li>
                {user ?
                    <>
                        {user.profile_id ?
                            <li className="user-name-link">
                                <Link to={`profiles/${user.profile_id}`}>{user.username}</Link>
                            </li>
                            :
                            <li className="user-name-link">
                                <Link to={`profiles/create`}>{user.username}</Link>
                            </li>
                        }
                        <li>
                            <Link to="/collectibles">Collection</Link>
                        </li>
                        <li>
                            <Link to="/collectibles/create">Add to Collection</Link>
                        </li>
                        <li>
                            <Link to="/profiles">Collectors</Link>
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
                        <li>
                            <Link to="/profiles">Collectors</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
};

export default Navbar;