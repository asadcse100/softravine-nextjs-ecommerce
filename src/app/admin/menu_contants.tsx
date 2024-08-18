import { 
    BsGear,
    BsHouseDoor,
    BsKanban,
    BsShopWindow,
    BsPeople,
    BsNewspaper,
    BsCart3,
    BsCart4,
    BsHammer,
    BsCartPlus,
    BsPersonWalking,
    BsCash,
    BsCloudUpload,
    BsPersonWorkspace,
    BsMegaphone,
    BsDiagram3,
    BsCashCoin,
    BsBookmarkStarFill,
    BsShieldLock,
    BsGraphUp,
    BsChatQuoteFill,
    BsBlockquoteLeft,
    BsGearWideConnected,
    BsTools,
    BsWindowDesktop,
    BsPuzzle
 } from "react-icons/bs";
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
        icon: <BsPersonWorkspace size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Staff', path: '/admin/pages/staff/staffs'},
            {title: 'Add Staff', path: '/admin/pages/staff/staffs/addnew'},
            {title: 'Staff Roles', path: '/admin/pages/staff/staff_roles'},
            {title: 'Add Roles', path: '/admin/pages/staff/staff_roles/addnew'},
        ],
    },
    {
        title: 'POS',
        path: '/staffs',
        icon: <BsNewspaper size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'POS Manager', path: '/admin/pages/pos'},
            {title: 'POS Configuration', path: '/admin/pages/pos/configuration'},
        ],
    },
    {
        title: 'Products',
        path: '/products',
        icon: <BsCart3 size={20} />,
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
            {title: 'Add Brand', path: '/admin/pages/product/brand/addnew'},
            {title: 'Brand Bulk Upload', path: '/admin/pages/product/brand/bulk_upload'},
            {title: 'Attribute', path: '/admin/pages/product/attribute'},
            {title: 'Add Attribute', path: '/admin/pages/product/attribute/addnew'},
            {title: 'Color', path: '/admin/pages/product/color'},
            {title: 'Add Color', path: '/admin/pages/product/color/addnew'},
            {title: 'Size Chart', path: '/admin/pages/product/size_guide/size_chart'},
            {title: 'Add Size Chart', path: '/admin/pages/product/size_guide/size_chart/addnew'},
            {title: 'Measurement Points', path: '/admin/pages/product/size_guide/points'},
            {title: 'Add Measurement Points', path: '/admin/pages/product/size_guide/points/addnew'},
            {title: 'Product Reviews', path: '/admin/pages/product/review'},
            {title: 'Bulk Import', path: '/admin/pages/product/import'},
            {title: 'Bulk Export', path: '/admin/pages/product/export'},
        ],
    },
    {
        title: 'Auction Products',
        path: '/auction',
        icon: <BsHammer size={20} />,
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
        icon: <BsCart4 size={20} />,
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
        path: '#',
        icon: <BsCartPlus size={20} />,
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
        icon: <BsPersonWalking size={20} />,
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
        icon: <BsCash size={20} />,
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
        icon: <BsPeople size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Customer', path: '/admin/pages/customer'},
            {title: 'Classified Products', path: '/admin/pages/customer/classified_product'},
            {title: 'Classified Packages', path: '/admin/pages/customer/classified_package'},
        ],
    },
    {
        title: 'Sellers',
        path: '/sellers',
        icon: <BsShopWindow size={20} />,
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
        title: 'Marketing',
        path: '/marketing',
        icon: <BsMegaphone size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Flash Deals', path: '/admin/pages/marketing/flash_deals'},
            {title: 'Add Flash Deals', path: '/admin/pages/marketing/flash_deals/addnew'},
            {title: 'Pop-ups', path: '/admin/pages/marketing/pop_up'},
            {title: 'Add Pop-up', path: '/admin/pages/marketing/pop_up/addnew'},
            {title: 'Newsletters', path: '/admin/pages/marketing/newsletter'},
            {title: 'Send Newsletters', path: '/admin/pages/marketing/newsletter/addnew'},
            {title: 'Bulk SMS', path: '/admin/pages/marketing/bulk_sms'},
            {title: 'Subscribers', path: '/admin/pages/marketing/subscriber'},
            {title: 'Coupons', path: '/admin/pages/marketing/coupon'},
            {title: 'Add Coupon', path: '/admin/pages/marketing/coupon/addnew'},
        ],
    },
    {
        title: 'Affiliate',
        path: '/affiliate',
        icon: <BsDiagram3 size={20} />,
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
        icon: <BsCashCoin size={20} />,
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
        icon: <BsBookmarkStarFill size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Configurations', path: '/admin/pages/club_point/configuration'},
            {title: 'Product Point', path: '/admin/pages/club_point/product_point'},
            {title: 'Add Product Point', path: '/admin/pages/club_point/product_point/addnew'},
            {title: 'User Point', path: '/admin/pages/club_point/user_point'},
        ],
    },
    {
        title: 'OTP',
        path: '/otp',
        icon: <BsShieldLock size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Configurations', path: '/admin/pages/otp/configuration'},
            {title: 'SMS Templates', path: '/admin/pages/otp/sms_template'},
            {title: 'OTP Credentials', path: '/admin/pages/otp/cerdential'},
        ],
    },
    {
        title: 'Reports',
        path: '/report',
        icon: <BsGraphUp size={20} />,
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
        title: 'Uploaded Files',
        path: '/admin/pages/upload',
        icon: <BsCloudUpload size={20} />
    },
    {
        title: 'Blogs',
        path: '/blog',
        icon: <BsBlockquoteLeft size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All Blogs', path: '/admin/pages/blog_system/all_blog'},
            {title: 'Add New', path: '/admin/pages/blog_system/all_blog/addnew'},
            {title: 'Categories', path: '/admin/pages/blog_system/category'},
            {title: 'Add Category', path: '/admin/pages/blog_system/category/addnew'},
        ],
    },
    {
        title: 'Support',
        path: '/support',
        icon: <BsChatQuoteFill size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Ticket', path: '/admin/pages/support/support_ticket'},
            {title: 'Product Conversions', path: '/admin/pages/support/conversion'},
            {title: 'Product Queries', path: '/admin/pages/support/product_query'},
        ],
    },
    {
        title: 'My-bis Option',
        path: '/my_bis_option',
        icon: <BsWindowDesktop size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Mobile Recharge', path: '/admin/pages/my_bis_option/mobile_recharge'},
            {title: 'Drive Offer', path: '/admin/pages/my_bis_option/drive_offer'},
            {title: 'Air Ticket', path: '/admin/pages/my_bis_option/air_ticket'},
            {title: 'News Paper', path: '/admin/pages/my_bis_option/news_paper'},
            {title: 'Live TV', path: '/admin/pages/my_bis_option/live_tv'},
            {title: 'Blood Bank', path: '/admin/pages/my_bis_option/blood_bank'},
            {title: 'Online Doctor', path: '/admin/pages/my_bis_option/online_doctor'},
        ],
    },
    {
        title: 'Website Settings',
        path: '/setting',
        icon: <BsWindowDesktop size={20} />,
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
        path: '/feature_setting',  
        icon: <BsGearWideConnected size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Features Activation', path: '/admin/pages/feature_setting/feature_activation'},
            {title: 'Languages', path: '/admin/pages/feature_setting/language'},
            {title: 'Add Language', path: '/admin/pages/feature_setting/language/addnew'},
            {title: 'Currency', path: '/admin/pages/feature_setting/currency'},
            {title: 'VAT & TAX', path: '/admin/pages/feature_setting/vatntax'},
            {title: 'Pickup Point', path: '/admin/pages/feature_setting/pickup_point'},
            {title: 'Add Pickup Point', path: '/admin/pages/feature_setting/pickup_point/addnew'},
            {title: 'SMTP', path: '/admin/pages/feature_setting/smtp'},
            {title: 'Payment Methods', path: '/admin/pages/feature_setting/payment_method'},
            {title: 'Order Configuration', path: '/admin/pages/feature_setting/order'},
            {title: 'File System', path: '/admin/pages/feature_setting/file_system'},
            {title: 'Cache Manage', path: '/admin/pages/feature_setting/cache_manage'},
            {title: 'Social Media Logins', path: '/admin/pages/feature_setting/social_media_login'},
            {title: 'Facebook Chat', path: '/admin/pages/feature_setting/facebook/chat'},
            {title: 'Facebook Comment', path: '/admin/pages/feature_setting/facebook/comment'},
            {title: 'Google Analytics', path: '/admin/pages/feature_setting/google/analytics'},
            {title: 'Google reCaptcha', path: '/admin/pages/feature_setting/google/reCaptcha'},
            {title: 'Google Map', path: '/admin/pages/feature_setting/google/map'},
            {title: 'Google Firebase', path: '/admin/pages/feature_setting/google/firebase'},
            {title: 'Shipping Configuration', path: '/admin/pages/feature_setting/shipping/shipping_configuration'},
            {title: 'Shipping Countries', path: '/admin/pages/feature_setting/shipping/countries'},
            {title: 'Shipping States', path: '/admin/pages/feature_setting/shipping/states'},
            {title: 'Add Shipping States', path: '/admin/pages/feature_setting/shipping/states/addnew'},
            {title: 'Shipping Cities', path: '/admin/pages/feature_setting/shipping/cities'},
            {title: 'Add Shipping Cities', path: '/admin/pages/feature_setting/shipping/cities/addnew'},
            {title: 'Shipping Zones', path: '/admin/pages/feature_setting/shipping/zones'},
            {title: 'Add Shipping Zones', path: '/admin/pages/feature_setting/shipping/zones/addnew'},
            {title: 'Shipping Courier', path: '/admin/pages/feature_setting/shipping/courier'},
            {title: 'Add Shipping Courier', path: '/admin/pages/feature_setting/shipping/courier/addnew'},
        ],
    },
    {
        title: 'Software System',
        path: '/software_system',
        icon: <BsTools size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'Update', path: '/admin/pages/software_system/update'},
            {title: 'Server Status', path: '/admin/pages/software_system/server_status'},
        ],
    },
    {
        title: 'Add Feature',
        path: '/admin/pages/plugin',
        icon: <BsPuzzle size={20} />
    },
]