import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as collectibleService from '../../services/collectibleService';


const CollectibleForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        rating: 0,
        count: 0,
        condition: 'Mint',
        date_obtained: new Date().toISOString().slice(0, 10),
    });

    const { collectibleId } = useParams();

    useEffect(() => {
        const fetchCollectible = async () => {
            const [collectibleData] = await collectibleService.show(collectibleId);
            setFormData(collectibleData);
            console.log(collectibleData);
        };
        if (collectibleId) fetchCollectible();
    }, [collectibleId]);

    const handleChange = (evt) => {
        console.log('before set', formData);
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        console.log(formData);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (collectibleId) {
            props.handleUpdateCollectible(collectibleId, formData);
        } else {
            props.handleCreateCollectible(formData);
        }
    };

    
    return (
        <main>
            <h1>{collectibleId ? 'Edit Collectible' : 'New Collectible'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input">Name</label>
                <input
                    required
                    type="text"
                    name="name"
                    id="name-input"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="image-input">Image</label>
                <input
                    type="text"
                    name="image"
                    id="image-input"
                    value={formData.image}
                    onChange={handleChange}
                />
                <label htmlFor="rating-input">Rating</label>
                <input
                    type="number"
                    name="rating"
                    id="rating-input"
                    value={formData.rating}
                    onChange={handleChange}
                />
                <label htmlFor="count-input">Count</label>
                <input
                    type="number"
                    name="count"
                    id="count-input"
                    value={formData.count}
                    onChange={handleChange}
                />
                <label htmlFor="condition-input">Condition</label>
                <input
                    required
                    type="text"
                    name="condition"
                    id="condition-input"
                    value={formData.condition}
                    onChange={handleChange}
                />
                <label htmlFor="date_obtained-input">Date Obtained</label>
                <input
                    required
                    type="date"
                    name="date_obtained"
                    id="date_obtained-input"
                    value={new Date(formData.date_obtained).toISOString().slice(0, 10)}
                    onChange={handleChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
};

export default CollectibleForm;
