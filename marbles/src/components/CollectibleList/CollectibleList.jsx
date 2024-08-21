import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const CollectibleList = ({ collectibles }) => {

    const [formData, setFormData] = useState({
        detail: 'id',
        order: 'asc',
    });

    const orderList = (detail, order = 'asc') => {
        if (order === 'asc') {
            collectibles.sort((a, b) => a[detail] > b[detail]);
        }
        else if (order = 'desc') {
            collectibles.sort((a, b) => a[detail] < b[detail]);
        }
    }

    orderList(formData.detail, formData.order);
        // call on Component render so state updates on first handleChange

    // orderList('id', 'desc');
    // orderList('id', 'asc');
    // orderList('rating');
    // handleOrderChange = () => {
        // orderList()
    // };


    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        // console.log(typeof value)
        // console.log(evt.target.value)
        setFormData({ ...formData, [name]: value });
        orderList(formData.detail, formData.order);
    };


    // console.log(collectibles);
    // console.log(collectibles.sort((a, b) => a.id < b.id)); // reorders list and updates state
    // let i = 0;
    // collectibles.map(collectible => {
    //     console.log(i, collectible.id)
    //     i++
    // })


    return (
        <>
            <main>
                <select
                    required
                    name="detail"
                    id="detail-input"
                    value={formData.detail}
                    onChange={handleChange}
                    >
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="count">Count</option>
                    <option value="condition">Condition</option>
                    <option value="date_obtained">Date Obtained</option>
                </select>
                
                <select
                    required
                    name="order"
                    id="order-input"
                    value={formData.order}
                    onChange={handleChange}
                    >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                {collectibles.map((collectible) => (
                    <Link key={collectible.id} to={`/collectibles/${collectible.id}`}>
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