import { FC } from 'react';
import { MailMessage } from '...'; // Import MailMessage from wherever it's located

interface PasswordResetRequestProps {
  token: string;
}

const PasswordResetRequest: FC<PasswordResetRequestProps> = ({ token }) => {
  const url = process.env.NEXT_PUBLIC_APP_URL + '/password/reset/' + token;

  return (
    <MailMessage>
      <p>You are receiving this email because we received a password reset request for your account.</p>
      <a href={url}>Reset Password</a>
      <p>If you did not request a password reset, no further action is required.</p>
    </MailMessage>
  );
};

export default PasswordResetRequest;
