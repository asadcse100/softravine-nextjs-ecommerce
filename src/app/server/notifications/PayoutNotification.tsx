interface User {
    id: number;
    user_type: string;
    name: string;
}

interface PayoutNotificationProps {
    user: User;
    amount: number;
    status?: string;
}

class PayoutNotification {
    user: User;
    amount: number;
    status: string | undefined;

    constructor({ user, amount, status = '' }: PayoutNotificationProps) {
        this.user = user;
        this.amount = amount;
        this.status = status;
    }

    via() {
        return ['database'];
    }

    toMail() {
        return {
            line: 'The introduction to the notification.',
            action: 'Notification Action',
            url: '/',
            finalLine: 'Thank you for using our application!'
        };
    }

    toArray() {
        return {
            user_id: this.user.id,
            user_type: this.user.user_type,
            name: this.user.name,
            payment_amount: this.amount,
            status: this.status
        };
    }
}
