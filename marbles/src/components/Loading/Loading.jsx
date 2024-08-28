import '../../assets/stylesheets/Loading.scss';
import marble1 from '../../assets/images/marble1.svg';


const Loading = () => {

    return (
        <>
            <div className="loading-page">
                <img className="loading-marble" src={marble1} alt="Spinning marble to represent loading." />
            </div>
        </>
    );
};

export default Loading;