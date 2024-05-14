import axios from 'axios';

interface User {
  access_token: string;
}

interface RevokeResponse {
  http_code: number;
}

export default class GoogleRevoke {
  public async apply(): Promise<number> {
    try {
      const token = this.getAccessToken();
      const response = await axios.post<RevokeResponse>(
        `https://oauth2.googleapis.com/revoke?token=${token}`,
        null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.status;
    } catch (error) {
      // Handle error appropriately, like logging or throwing
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
