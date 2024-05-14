import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

interface User {
    access_token: string;
    provider_id: string;
}

interface ProviderRevoke {
    apply(): Promise<number>;
}

class FacebookRevoke implements ProviderRevoke {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    async apply(): Promise<number> {
        const { access_token, provider_id } = this.user;
        try {
            const response: AxiosResponse = await axios.delete(`https://graph.facebook.com/v3.0/${provider_id}/permissions?access_token=${access_token}`);
            return response.status;
        } catch (error) {
            console.error('Error revoking permissions:', error);
            return 500; // Return appropriate error status code
        }
    }
}

// Example Next.js API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Mocked user data, replace this with actual user authentication
    const user: User = {
        access_token: 'user_access_token',
        provider_id: 'facebook_provider_id'
    };

    const facebookRevoke = new FacebookRevoke(user);

    try {
        const statusCode = await facebookRevoke.apply();
        res.status(statusCode).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
