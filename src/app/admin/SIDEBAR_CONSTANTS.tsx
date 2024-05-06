import { BsGear, BsHouseDoor, BsKanban, BsListUl, BsPostage } from "react-icons/bs";
import { SideNavItem } from "@/../types/types";

export const SIDENAV_ITEMS:SideNavItem[] = [
    {
        title:"Dashboard",
        path:"/admin",
        icon: <BsHouseDoor size={20}/>
    },
    {
        title: 'Staffs',
        path: '/staffs',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Staff', path: '/admin/pages/staff/staffs'},
            {title: 'Add Staff', path: '/admin/pages/staff/staffs/addnew'},
            {title: 'Staff Roles', path: '/admin/pages/staff/staff_roles'},
            {title: 'Add Roles', path: '/admin/pages/staff/staff_roles/addnew'},
        ],
    },
    {
        title:"POS",
        path:"/admin/pages/pos",
        icon: <BsPostage size={20}/>
    },
    {
        title: 'Products',
        path: '/products',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Products', path: '/admin/pages/product/products'},
            {title: 'Add New', path: '/admin/pages/product/addnew'},
            {title: 'In House', path: '/admin/pages/product/admin'},
            {title: 'Digital Products', path: '/admin/pages/product/digital_products'},
            {title: 'Add Digital Product', path: '/admin/pages/product/digital_products/addnew'},
            {title: 'Seller Physical Products', path: '/admin/pages/product/seller/physical'},
            {title: 'Seller Digital Products', path: '/admin/pages/product/seller/digital'},
            {title: 'Category', path: '/admin/pages/product/category'},
            {title: 'Category Wise Discount', path: '/admin/pages/product/category_wise_discount'},
            {title: 'Brands', path: '/admin/pages/product/brand'},
            {title: 'Attribute', path: '/admin/pages/product/attribute'},
            {title: 'Color', path: '/admin/pages/product/color'},
            {title: 'Size Chart', path: '/admin/pages/product/size_guide/guide'},
            {title: 'Measurement Points', path: '/admin/pages/product/size_guide/points'},
            {title: 'Product Reviews', path: '/admin/pages/product/review'},
            {title: 'Bulk Import', path: '/admin/pages/product/import'},
            {title: 'Bulk Export', path: '/admin/pages/product/export'},
        ],
    },
    {
        title: 'Auction Products',
        path: '/auction',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Auction', path: '/admin/pages/auction'},
            {title: 'Add New', path: '/admin/pages/auction/addnew'},
            {title: 'Admin Products', path: '/admin/pages/auction/admin'},
            {title: 'Seller Auction', path: '/admin/pages/auction/seller'},
            {title: 'Auction Orders', path: '/admin/pages/auction/order'},
        ],
    },
    {
        title: 'WholeSale Products',
        path: '/wholesale',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All wholesale', path: '/admin/pages/wholesale'},
            {title: 'Add New', path: '/admin/pages/wholesale/addnew'},
            {title: 'In House', path: '/admin/pages/wholesale/admin'},
            {title: 'Seller wholesale', path: '/admin/pages/wholesale/seller'},
        ],
    },
    {
        title: 'Order',
        path: '/order',
        icon: <BsListUl size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Order', path: '/admin/pages/order'},
            {title: 'In House', path: '/admin/pages/order/admin'},
            {title: 'Seller Order', path: '/admin/pages/order/seller'},
            {title: 'Pick-up Point', path: '/admin/pages/order/pickup'},
        ],
    },
    {
        title: 'Delivery Boy',
        path: '/deliveryboy',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Delivery Boy', path: '/admin/pages/deliveryboy'},
            {title: 'Add Delivery Boy', path: '/admin/pages/deliveryboy/addnew'},
            {title: 'Payment Histories', path: '/admin/pages/deliveryboy/payment_history'},
            {title: 'Collected Histories', path: '/admin/pages/deliveryboy/collected_history'},
            {title: 'Cancel Request', path: '/admin/pages/deliveryboy/cancel_request'},
            {title: 'Configuration', path: '/admin/pages/deliveryboy/configuration'},
        ],
    },
    {
        title: 'Refunds',
        path: '/refunds',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Refund Requests', path: '/admin/pages/refund/refund_request'},
            {title: 'Approved Refunds', path: '/admin/pages/refund/approved_refund'},
            {title: 'Rejected Refunds', path: '/admin/pages/refund/rejected_refund'},
            {title: 'Refund Configuration', path: '/admin/pages/refund/configuration'},
        ],
    },
    {
        title: 'Customers',
        path: '/customer',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Customer', path: '/admin/pages/customer'},
            {title: 'Classified Products', path: '/admin/pages/classified_product'},
            {title: 'Classified Packages', path: '/admin/pages/classified_package'},
        ],
    },
    {
        title: 'Sellers',
        path: '/sellers',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Seller', path: '/admin/pages/sellers'},
            {title: 'Payouts', path: '/admin/pages/sellers/payment_histories'},
            {title: 'Payout Requests', path: '/admin/pages/sellers/seller_withdraw_requests'},
            {title: 'Seller Commission', path: '/admin/pages/sellers/seller_commission'},
            {title: 'Seller Packages', path: '/admin/pages/sellers/package'},
        ],
    },
    {
        title: 'Uploaded Files',
        path: '/admin/pages/upload',
        icon: <BsGear size={20} />
    },
    {
        title: 'Reports',
        path: '/report',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Admin Sale', path: '/admin/pages/report/admin_sale'},
            {title: 'Seller Sale', path: '/admin/pages/report/seller_sale'},
            {title: 'Stock', path: '/admin/pages/report/stock'},
            {title: 'Favorite List', path: '/admin/pages/report/favorite_list'},
            {title: 'Visitor Searches', path: '/admin/pages/report/visitor_search'},
            {title: 'Commission Histories', path: '/admin/pages/report/commission_history'},
            {title: 'Wallet Histories', path: '/admin/pages/report/wallet_history'},
        ],
    },
    {
        title: 'Blogs',
        path: '/blog',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Blogs', path: '/admin/pages/blog_system/all_blog'},
            {title: 'Add New', path: '/admin/pages/blog_system/all_blog/addnew'},
            {title: 'Categories', path: '/admin/pages/blog_system/category'},
        ],
    },
    {
        title: 'Marketing',
        path: '/marketing',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Flash Deals', path: '/admin/pages/marketing/flash_deals'},
            {title: 'Add Flash Deals', path: '/admin/pages/marketing/flash_deals/addnew'},
            {title: 'Pop-ups', path: '/admin/pages/marketing/pop_up'},
            {title: 'Add Pop-up', path: '/admin/pages/marketing/pop_up/addnew'},
            {title: 'Newsletters', path: '/admin/pages/marketing/newsletter'},
            {title: 'Bulk SMS', path: '/admin/pages/marketing/bulk_sms'},
            {title: 'Subscribers', path: '/admin/pages/marketing/subscriber'},
            {title: 'Coupons', path: '/admin/pages/marketing/coupon'},
            {title: 'Add Coupon', path: '/admin/pages/marketing/coupon/addnew'},
        ],
    },
    {
        title: 'Support',
        path: '/support',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Ticket', path: '/admin/pages/support/support_ticket'},
            {title: 'Product Conversions', path: '/admin/pages/support/conversion'},
            {title: 'Product Queries', path: '/admin/pages/support/product_query'},
        ],
    },
    {
        title: 'Affiliate',
        path: '/affiliate',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Configarations', path: '/admin/pages/affiliate/configuration'},
            {title: 'Affiliate Users', path: '/admin/pages/affiliate/affiliate_user'},
            {title: 'Referral Users', path: '/admin/pages/affiliate/referral_user'},
            {title: 'Withdraw Requests', path: '/admin/pages/affiliate/withdraw_request'},
            {title: 'Logs', path: '/admin/pages/affiliate/log'},
        ],
    },
    {
        title: 'Offline Payment',
        path: '/offline_payment',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Manual Payment Methods', path: '/admin/pages/offline_payment/manual_payment_method'},
            {title: 'Add Manual Payment Methods', path: '/admin/pages/offline_payment/manual_payment_method/addnew'},
            {title: 'Offline Wallet Recharge', path: '/admin/pages/offline_payment/offline_wallet_recharge'},
            {title: 'Offline Customer Package Payments', path: '/admin/pages/offline_payment/offline_customer_package_payment'},
            {title: 'Offline Seller Package Payments', path: '/admin/pages/offline_payment/offline_seller_package_payment'},
        ],
    },
    {
        title: 'Club Point',
        path: '/club_point',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Configurations', path: '/admin/pages/club_point/configuration'},
            {title: 'Product Point', path: '/admin/pages/club_point/product_point'},
            {title: 'User Point', path: '/admin/pages/club_point/user_point'},
        ],
    },
    {
        title: 'OTP',
        path: '/otp',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Configurations', path: '/admin/pages/otp/configuration'},
            {title: 'SMS Templates', path: '/admin/pages/otp/sms_template'},
            {title: 'OTP Credentials', path: '/admin/pages/otp/cerdential'},
        ],
    },
    {
        title: 'Website Settings',
        path: '/setting',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Header', path: '/admin/pages/setting/header'},
            {title: 'Footer', path: '/admin/pages/setting/footer'},
            {title: 'Pages', path: '/admin/pages/setting/page'},
            {title: 'Add Page', path: '/admin/pages/setting/page/addnew'},
            {title: 'Appearance', path: '/admin/pages/setting/appearance'},
        ],
    },
    {
        title: 'Feature Settings',
        path: '/configuration',
        icon: <BsGear size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Features Activation', path: '/admin/pages/configuration/feature_activation'},
            {title: 'Languages', path: '/admin/pages/configuration/language'},
            {title: 'Currency', path: '/admin/pages/configuration/currency'},
            {title: 'VAT & TAX', path: '/admin/pages/configuration/vatntax'},
            {title: 'Pickup Point', path: '/admin/pages/configuration/pickup_point'},
            {title: 'SMTP', path: '/admin/pages/configuration/smtp'},
            {title: 'Payment Methods', path: '/admin/pages/configuration/payment_method'},
            {title: 'Order Configuration', path: '/admin/pages/configuration/order'},
            {title: 'File System', path: '/admin/pages/configuration/file_system'},
            {title: 'Cache Manage', path: '/admin/pages/configuration/cache_manage'},
            {title: 'Social Media Logins', path: '/admin/pages/configuration/social_media_login'},
            {title: 'Facebook', path: '/admin/pages/configuration/facebook',
            submenu: true,
            subMenuItems: [
                {title: 'Chat', path: '/admin/pages/configuration/facebook/chat'},
                {title: 'Comment', path: '/admin/pages/configuration/facebook/comment'},
            ]},
            {title: 'Google', path: '/admin/pages/configuration/google',
            submenu: true,
            subMenuItems: [
                {title: 'Analytics', path: '/admin/pages/configuration/google/analytics'},
                {title: 'reCaptcha', path: '/admin/pages/configuration/google/reCaptcha'},
                {title: 'Map', path: '/admin/pages/configuration/google/map'},
                {title: 'Firebase', path: '/admin/pages/configuration/google/firebase'},
            ]},
            {title: 'Shipping', path: '/admin/pages/configuration/shipping',
            submenu: true,
            subMenuItems: [
                {title: 'Configuration', path: '/admin/pages/configuration/shipping/configuration'},
                {title: 'Countries', path: '/admin/pages/configuration/country'},
                {title: 'States', path: '/admin/pages/configuration/state'},
                {title: 'Cities', path: '/admin/pages/configuration/city'},
                {title: 'Zones', path: '/admin/pages/configuration/zone'},
                {title: 'Courier', path: '/admin/pages/configuration/courier'},
            ]},
        ],
    },
    {
        title: 'Software System',
        path: '/setting',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Update', path: '/admin/pages/update'},
            {title: 'Server Status', path: '/admin/pages/server_status'},
        ],
    },
    {
        title: 'Add Feature',
        path: '/admin/pages/plugin',
        icon: <BsGear size={20} />
    },
]