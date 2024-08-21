import { Link } from 'react-router-dom';


const CollectibleList = ({ collectibles }) => {

    console.log(collectibles);

    return (
        <>
            <main>
            {collectibles.map((collectible) => (
                // <Link key={collectible.id} to={`/collectibles/${collectible.id}`}>
                <Link key={collectible.id} to={`/collectibles`}>
                    <article>
                        <header>
                            <div>
                                <h2>{collectible.name}</h2>
                                <h4>{collectible.rating}</h4>
                            </div>
                        </header>
                        <p>{collectible.condition}</p>
                        <p>{collectible.count}</p>
                    </article>
                </Link>
            ))}
            </main>
        </>
    )

}

export default CollectibleList;