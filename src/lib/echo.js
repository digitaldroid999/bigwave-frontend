import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

window.Pusher = Pusher;

console.log('process.env.REACT_APP_PUSHER_APP_KEY', process.env.REACT_APP_PUSHER_APP_KEY);
axios.defaults.withCredentials = true; // <-- THE MOST IMPORTANT PART

const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    forceTLS: false,
    authorizer: (channel) => ({
        authorize: async (socketId, callback) => {
            const token = localStorage.getItem('authToken');
            const tokenType = localStorage.getItem('tokenType') || 'Bearer';

            if (!token) {
                const error = new Error('Missing auth token for broadcasting auth request');
                console.error('[Echo] Broadcasting auth failed:', error);
                callback(error, null);
                return;
            }

            try {
                const authHeaders = {
                    Authorization: `${tokenType} ${token}`,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                };

                console.log('[Echo] Authorizing channel', channel.name, 'with headers', authHeaders);

                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/broadcasting/auth`,
                    {
                        socket_id: socketId,
                        channel_name: channel.name,
                    },
                    {
                        headers: authHeaders,
                    }
                );

                callback(null, response.data);
            } catch (error) {
                console.error('[Echo] Broadcasting auth error:', error?.response || error);
                callback(error, null);
            }
        },
    }),
});

export default echo;