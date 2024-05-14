import { Request } from 'express';

namespace App.Services {

    export class SocialRevoke {

        public apply(provider: string): any {
            const providerClass = App.Services.Revoke[provider.replace(' ', '').replace('_', '') + 'Revoke'];

            if (providerClass) {
                return (new providerClass()).apply();
            }
            const revoke = new providerClass();
            return revoke.apply();
        }

    }

}
