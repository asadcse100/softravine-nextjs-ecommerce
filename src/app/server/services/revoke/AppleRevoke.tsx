import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface RevokeRequest {
  refresh_token: string;
}

interface AppleAuthResponse {
  access_token: string;
}

interface RevokeResponse {
  ok: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevokeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { refresh_token }: RevokeRequest = req.body;
  const grant_type = 'refresh_token';
  const client_id = process.env.SIGN_IN_WITH_APPLE_CLIENT_ID;
  const client_secret = process.env.SIGN_IN_WITH_APPLE_CLIENT_SECRET;
  const redirect_uri = process.env.SIGN_IN_WITH_APPLE_REDIRECT;

  try {
    // Get access token using refresh token
    const tokenResponse = await axios.post<AppleAuthResponse>(
      'https://appleid.apple.com/auth/token',
      {
        client_id,
        client_secret,
        grant_type,
        refresh_token,
        redirect_uri,
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const access_token = tokenResponse.data.access_token;

    // Revoke access token
    const revokeResponse = await axios.post(
      'https://appleid.apple.com/auth/revoke',
      {
        client_id,
        client_secret,
        token_type_hint: grant_type,
        token: access_token,
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    res.status(200).json({ ok: revokeResponse.status === 200 });
  } catch (error) {
    console.error('Error revoking token:', error.response?.data);
    res.status(error.response?.status || 500).json({ ok: false });
  }
}
