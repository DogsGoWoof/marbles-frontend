import { useContext } from "react";
import { AuthedUserContext } from "../../App";

import '../../assets/stylesheets/Landing.scss';


const Landing = () => {

    const user = useContext(AuthedUserContext);

    const greetingMessages = [
        'Where you can chronicle your Bionicles',
        'Phrase your coin',
        'Tracks your knickknacks',
        'Function for your collection',
        'Turn your bobs into bits',
        'Beanie Babies!'
    ];

    const randomNumber = () => {
        return Math.floor(Math.random() * greetingMessages.length)
    }


    return (
        <main className="landing-main">
            <section className="landing-head landing">
                <h1 className="landing-title">Welcome to marbles!</h1>
                {user ?
                    <h2 className="landing-message landing">{greetingMessages[randomNumber()]}</h2>
                    :
                    <h2 className="landing-message landing">An online database for keeping track for what you keep on keeping in your keep.</h2>
                }
            </section>
            <section className="landing-body landing">
                <figure>
                    <img className="caw-collect image" src="https://listverse.com/wp-content/uploads/2019/02/10-crow-picking-up-trash.jpg" alt="A picture og a crow holding a piece of tin foil in its beak." />
                    <figcaption className="caption">Caw Collect</figcaption>
                </figure>
            </section>
        </main>
    )
};

export default Landing;