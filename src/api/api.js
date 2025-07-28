const API_URL = 'https://userback-net.onrender.com/api';

function getToken() {
    const tokenStorage = localStorage.getItem("token");

    if (tokenStorage === null) {
        return null;
    } else {
        const { token } = JSON.parse(tokenStorage);
        return token;
    }
}

const headers = (noFormData = true) => {
    const token = getToken();
    return {
        ...(noFormData && { 'Content-Type': 'application/json' }),
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
}

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return response.json();
};

export const get = async (endpoint) => {
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: headers(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
};

export const get_conf = async (endpoint, email) => {
    
    try {       
        return await fetch(`${API_URL}${endpoint}?email=${email}`);
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
};

export const post = async (endpoint, data, noFormData = true) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: headers(noFormData),
            body: noFormData ? JSON.stringify(data) : data,
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
};

export const put = async (endpoint, data, noFormData = true) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: headers(noFormData),
            body: noFormData ? JSON.stringify(data) : data,
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('PUT request failed:', error);
        throw error;
    }
};

export const del = async (endpoint) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: headers(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('DELETE request failed:', error);
        throw error;
    }
};
