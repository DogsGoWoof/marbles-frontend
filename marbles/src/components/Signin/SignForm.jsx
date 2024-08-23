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
                console.log(user);
                setUser(user);
            }
            navigate('/collectibles');
        } catch (err) {
            updateMessage(err.message);
        }
    };

    const { username, password, passwordConf } = formData;

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };


    return (
        <main>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <fieldset>
                    <legend><h1>{
                    formType === 'signin' ? 'Log In' : 'Sign Up' }</h1></legend>
                    <p>{message}</p>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            autoComplete="off"
                            id="username"
                            value={formData.username}
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            autoComplete="off"
                            id="password"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div id="buttons-confirmpw">
                        {formType === 'signup' ?
                            <>
                                <div>
                                    <label htmlFor="confirm">Confirm Password:</label>
                                    <input
                                        type="password"
                                        id="confirm"
                                        value={passwordConf}
                                        name="passwordConf"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className="signup" disabled={isFormInvalid()}>Sign Up</button>
                            </>
                            :
                            <>
                                <button>Log In</button>
                            </>
                        }
                        <Link className="link-wrapper" to="/">
                            <button className="cancel">Cancel</button>
                        </Link>
                    </div>
                </fieldset>
            </form>
        </main>
    );
};

export default SignForm;
