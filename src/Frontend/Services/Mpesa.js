import axios from 'axios';

export const getAuthToken = async () => {
    const response = await axios.get('/api/oauth-token');
    return response.data.access_token;
};

export const stkPush = async (phoneNumber, token) => {
    const response = await axios.post(
        '/api/stk-push',
        { phoneNumber },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
    return response.data;
};
