import { OtpConfiguration } from '../models/OtpConfiguration';
import { SmsSender } from './OTP/SmsSender';
import { EmailSender } from './OTP/EmailSender';

export class SendSmsService {
    public sendSMS(to: string, from: string, text: string, template_id: number): void {
        const otp = OtpConfiguration.query().where('value', 1).first().type;
        const otpClass = `OTP.${otp}`;

        let sender;

        switch (otpClass) {
            case 'OTP.SmsSender':
                sender = new SmsSender();
                break;
            case 'OTP.EmailSender':
                sender = new EmailSender();
                break;
            default:
                return;
        }

        sender.send(to, from, text, template_id);
    }
}
