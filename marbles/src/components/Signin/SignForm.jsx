import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';


const SignForm = ({ setUser, formType }) => {

    // console.log(formType);

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
            useNavigate('/');
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
                <h1>Log In</h1>
                <p>{message}</p>
                <div>
                    <label htmlFor="email">Username:</label>
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
                <div>
                    {formType === 'signup' ?
                        <>
                            <label htmlFor="confirm">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm"
                                value={passwordConf}
                                name="passwordConf"
                                onChange={handleChange}
                            />
                            <button disabled={isFormInvalid()}>Sign Up</button>
                        </>
                        :
                        <>
                            <button>Log In</button>
                        </>
                    }
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default SignForm;
