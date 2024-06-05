  
  export interface AffiliateConfigData {
    user_id?: string;
    address: string;
    country_id: string;
    state_id: string;
    city_id: string;
    longitude: number;
    latitude: number;
    postal_code: string;
    phone: string;
  }

  export interface AffiliateOption {
    id?: number;
    type: string;
    percentage?: number;
    details: any;
    status: boolean;
  }

  export interface AffiliateConfig {
    id?: number;
    type: string;
    value: any;
  }
  
  export interface AffiliateUser {
    id?: number;
    userId: number;
    informations: any;
  }
  