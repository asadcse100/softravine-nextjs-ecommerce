
  export type Notifiable = {
    id: string;
    verification_code: string;
  };
  
  export type EmailVerificationNotificationProps = {
    notifiable: Notifiable;
  };
  
  export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
    title: string;
    munuList: SideNavItem[]
}

export interface OrderNotificationType {
    order_id: number;
    order_code: string;
    user_id: number;
    seller_id: number;
    status: string;
}
