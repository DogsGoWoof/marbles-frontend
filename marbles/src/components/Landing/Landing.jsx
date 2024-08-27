import { useContext } from "react";
import { AuthedUserContext } from "../../App";

import '../../assets/stylesheets/Landing.scss';
import victornightingale from '../../assets/images/victornightingale.jpg';


const Landing = () => {

    const user = useContext(AuthedUserContext);

    const greetingMessages = [
        'Where you can chronicle your Bionicles',
        'Phrase a coin',
        'Tracks your knickknacks',
        'Function for your collection',
        'Turn your bobs into bits',
        'Beanie Babies!',
        'Sent to collections, but in a good way',
    ];

    const collectionOfCollectionMemes = [    
        <img 
        className="landing-meme" 
        src="https://external-preview.redd.it/shes-just-a-regular-malibu-stacy-with-a-stupid-cheap-hat-v0-_1qODHvIn39PUTA0hI943Yt0k7itUERRoHWbWNr7jDE.jpg?auto=webp&s=5f580e18cd7f3e7bf904053d0c59b7721995aae8" 
        alt={`The Simpsons - Smithers: "But she's got a new hat!"`} 
        />,
        <img 
        className="landing-meme" 
        src="https://y.yarn.co/894ba0ed-eb81-4ae3-ba1f-17029cfe1539_text.gif" 
        alt={`IASIP - Dennis: "I could even add you to my collection"`} 
        />,
        <img 
        className="landing-meme" 
        src={victornightingale} 
        alt={`30 Rock - Jack Donaghy at cookie jar convention.`} 
        />,
        <img 
        className="landing-meme" 
        src="https://i.etsystatic.com/7824645/r/il/7cf07f/3694532955/il_570xN.3694532955_i5lo.jpg" 
        alt={`Pokemon - Gotta Catch 'em All!`} 
        />,
        <iframe 
        className="landing-meme" 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/cvrwygO5_3k?si=BNaYIylX9A7_PvlP&amp;start=43&end=92" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen
        >
        </iframe>,
        <img 
        className="landing-meme" 
        src="https://i.kym-cdn.com/photos/images/newsfeed/001/472/776/a87.jpg" 
        alt={`Gravity Falls - Gruncle Stan: "After all these years. Finally, I have them all" meme with Yu-Gi-Oh! Egyptian God Cards.`} 
        />,    
    ];

    const randomNumber = (arr) => {
        return Math.floor(Math.random() * arr.length)
    }


    return (
        <main className="landing-main">
            <section className="landing-head landing">
                <h1 className="landing-title">Welcome to marbles!</h1>
                {user ?
                    <h2 className="landing-message landing">{greetingMessages[randomNumber(greetingMessages)]}</h2>
                    :
                    <h2 className="landing-message landing">An online database for keeping track for what you keep on keeping in your keep.</h2>
                }
            </section>
            <section className="landing-body landing">
                {user ? 
                collectionOfCollectionMemes[randomNumber(collectionOfCollectionMemes)]
                :
                <figure>
                    <img className="caw-collect image" src="https://listverse.com/wp-content/uploads/2019/02/10-crow-picking-up-trash.jpg" alt="A picture og a crow holding a piece of tin foil in its beak." />
                    <figcaption className="caption">Caw Collect</figcaption>
                </figure>
            }
            </section>
        </main>
    )
};

export default Landing;