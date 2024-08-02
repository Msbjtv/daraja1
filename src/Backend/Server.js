const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

const getOAuthToken = async () => {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const { data } = await axios.get(
        `https://${process.env.MPESA_ENV}.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,
        {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        }
    );
    return data.access_token;
};

app.post('/api/stk-push', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const token = await getOAuthToken();
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
        const password = Buffer.from(
            `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
        ).toString('base64');

        const { data } = await axios.post(
            `https://${process.env.MPESA_ENV}.safaricom.co.ke/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: 200, 
                PartyA: phoneNumber,
                PartyB: process.env.MPESA_SHORTCODE,
                PhoneNumber: phoneNumber,
                CallBackURL: `${process.env.CALLBACK_URL}/api/callback`, 
                AccountReference: 'SavaayActivation',
                TransactionDesc: 'Account Activation Payment',
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        res.status(200).json({ message: 'Payment request initiated', data });
    } catch (error) {
        console.error('Error initiating payment:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error initiating payment', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
