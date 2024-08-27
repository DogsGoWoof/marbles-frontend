import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';

import '../../assets/stylesheets/SignForm.scss';

const SignForm = ({ setUser, formType, navigate }) => {

    //___States___//
    const [message, setMessage] = useState(['']);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    });

    //___Handlers___//
    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        updateMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formType === 'signup') {
                const newUserResponse = await authService.signup(formData);
                setUser(newUserResponse.user);
            }
            else if (formType === 'signin') {
                const user = await authService.signin(formData);
                setUser(user);
            }
            navigate('/collectibles');
        } catch (err) {
            updateMessage(err.message);
        }
    };

    const { username, password, passwordConf } = formData;

    const userRegEx = '(?=\\S*\\w\\S*)\\w{3,12}';
    const passwordRegEx = '(?=.*[a-z].*)(?=.*\\W.*)(?=.*\\d.*)(?=.*[A-Z].*).{8,64}';

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };


    return (
        <main>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                        <h1>{formType === 'signin' ? 'Log In' : 'Sign Up'}</h1>
                    </legend>
                    <p>{message}</p>
                    <div className="input-container">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className={formType === 'signup' ? 'instructions' : ''}
                            id="username"
                            value={formData.username}
                            name="username"
                            onChange={handleChange}
                            pattern={userRegEx}
                            minLength={3}
                            maxLength={12}
                            placeholder=""
                        />
                        <ul>
                            <li>Username must:</li>
                            <li>Be between 3-12 characters</li>
                            <li>Not contain any spaces</li>
                        </ul>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            autoComplete="off"
                            className={formType === 'signup' ? 'instructions' : ''}
                            id="password"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            pattern={passwordRegEx}
                            minLength={8}
                            maxLength={64}
                            placeholder=""
                        />
                        <ul>
                            <li>Password must:</li>
                            <li>Be between 8-64 characters</li>
                            <li>Not contain any spaces</li>
                            <li>
                                Contain a minimum of 1 of each of the following:{'\n'}
                                <ul className="password-restrictions">
                                    <li>Number</li>
                                    <li>CAPITAL LETTER</li>
                                    <li>lower case letter</li>
                                    <li>$pecial Ch@racter</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div id="buttons-confirmpw">
                        {formType === 'signup' ?
                            <>
                                <div>
                                    <label htmlFor="confirm">Confirm Password:</label>
                                    <input
                                        type="password"
                                        className={formType === 'signup' ? 'instructions' : ''}
                                        id="confirm"
                                        value={passwordConf}
                                        name="passwordConf"
                                        onChange={handleChange}
                                        pattern={formData.password}
                                        minLength={8}
                                        maxLength={64}
                                        placeholder=""
                                    />
                                </div>
                                <button className="signup" disabled={isFormInvalid()}>Sign Up</button>
                            </>
                            :
                            <>
                                <button className="login">Log In</button>
                            </>
                        }
                        <div className="cancel">
                            <Link className="link-wrapper" to="/">
                                <button className="cancel">Cancel</button>
                            </Link>
                        </div>
                    </div>
                </fieldset>
            </form>
        </main>
    );
};

export default SignForm;
