import { Session } from '../types/Session';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const withAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    // Authentication logic here, e.g., checking tokens, sessions, etc.
    const isAuthenticated = true; // Replace with actual authentication logic

    if (!isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    return handler(req, res);
};