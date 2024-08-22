const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/profiles`;

const index = async () => {
        // use to create users index page
    try {
        const res = await fetch(BASE_URL);
        // const res = await fetch(BASE_URL, {
        //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        // });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (profileFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async (profileId) => {
    try {
        const res = await fetch(`${BASE_URL}/${profileId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const update = async (profileId, profileFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${profileId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteProfile = async (profileId) => {
    try {
        const res = await fetch(`${BASE_URL}/${profileId}`, {
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

export {
    index,
    show,
    create,
    deleteProfile,
    update,
};