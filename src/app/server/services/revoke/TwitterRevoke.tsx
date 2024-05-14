import axios from 'axios';

interface ProviderRevoke {
  apply(): Promise<number>;
}

interface User {
  access_token: string;
}

export default class TwitterRevoke implements ProviderRevoke {
  public async apply(): Promise<number> {
    try {
      const token = this.getAccessToken();
      const clientId = process.env.TWITTER_CLIENT_ID;

      const requestData = {
        client_id: clientId,
        token: token,
        token_type_hint: 'access_token'
      };

      const response = await axios.post(
        'https://api.twitter.com/2/oauth2/revoke',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.status;
    } catch (error) {
      console.error('Error revoking token:', error);
      throw error;
    }
  }

  private getAccessToken(): string {
    // Implement your logic to get access token, for example from local storage or cookie
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    return user.access_token || '';
  }
}
