const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/collectibles`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async (collectibleId) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectibleId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (collectibleFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collectibleFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteCollectible = async (collectibleId) => {
        // 'delete' is a JS keyword
    try {
        const res = await fetch(`${BASE_URL}/${collectibleId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const update = async (collectibleId, collectibleFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectibleId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collectibleFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    index,
    show,
    create,
    deleteCollectible,
    update,
};