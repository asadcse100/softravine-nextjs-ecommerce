import { 
    BsGear,
    BsHouseDoor,
    BsKanban,
    BsListUl,
    BsCart3,
    BsHammer,
    BsCart4,
    BsCashCoin,
    BsCartPlus,
    BsBackpack4,
    BsCreditCard2Front,
    BsCloudUpload,
    BsChatQuoteFill,
    BsPatchQuestion,
    BsArrowLeftRight,
    BsShop,
    BsCashStack,
    BsFileEarmarkPostFill,
} from "react-icons/bs";
import { SideNavItem } from "@/../types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: "Dashboard",
        path: "/seller",
        icon: <BsHouseDoor size={20} />
    },
    {
        title: "POS",
        path: "/seller/pages/pos",
        icon: <BsFileEarmarkPostFill size={20} />
    },
    {
        title: 'Products',
        path: '/products',
        icon: <BsCart3 size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'All Products', path: '/seller/pages/product/products' },
            { title: 'Add New', path: '/seller/pages/product/addnew' },
            { title: 'Category Wise Discount', path: '/seller/pages/product/category_wise_discount' },
            // {title: 'Bulk Upload', path: '/seller/pages/product/product_bulk_upload'},
            { title: 'Digital Products', path: '/seller/pages/product/digital_product' },
            { title: 'Digital Products Add', path: '/seller/pages/product/digital_product/addnew' },
            { title: 'Product Reviews', path: '/seller/pages/product/product_review' },
        ],
    },
    {
        title: 'Auction Products',
        path: '/auction',
        icon: <BsHammer size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'All Auction', path: '/seller/pages/auction' },
            { title: 'Add New', path: '/seller/pages/auction/addnew' },
            { title: 'Orders', path: '/seller/pages/auction/order' },
        ]
    },
    {
        title: 'Wholesale Products',
        path: '/wolesale',
        icon: <BsCart4 size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'All Wolesale', path: '/seller/pages/wolesale/products' },
            { title: 'Add New', path: '/seller/pages/wolesale/addnew' },
        ]
    },
    {
        title: 'Earning',
        path: '/earning',
        icon: <BsCashCoin size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'Earning Balance', path: '/seller/pages/earning-balance' },
            { title: 'Payment History', path: '/seller/pages/payment_history' },
            { title: 'Withdraw History', path: '/seller/pages/money_withdraw' },
            { title: 'Commission History', path: '/seller/pages/commission_history' },
        ]
    },
    {
        title: 'Voucher Balance',
        path: '/seller/pages/voucher-balance',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Orders',
        path: '/seller/pages/orders',
        icon: <BsCartPlus size={20} />
    },
    {
        title: 'Package',
        path: '/package',
        icon: <BsBackpack4 size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'All Package', path: '/seller/pages/package' },
            { title: 'Purchase', path: '/seller/pages/package/purchase' },
        ],
    },
    {
        title: 'Coupon',
        path: '/coupon',
        icon: <BsCreditCard2Front size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'Coupons', path: '/seller/pages/coupons' },
            { title: 'Add New', path: '/seller/pages/coupons/addnew' },
        ]
    },
    {
        title: 'Received Refund',
        path: '/seller/pages/received_refund',
        icon: <BsCashStack size={20} />
    },
    {
        title: 'Shop Setting',
        path: '/seller/pages/shop_setting',
        icon: <BsShop size={20} />
    },
    {
        title: 'Conversations',
        path: '/seller/pages/conversations',
        icon: <BsArrowLeftRight size={20} />
    },
    {
        title: 'Product Queries',
        path: '/seller/pages/product_queries',
        icon: <BsPatchQuestion size={20} />
    },
    {
        title: 'Support Ticket',
        path: '/seller/pages/support_ticket',
        icon: <BsChatQuoteFill size={20} />
    },
    {
        title: 'Uploaded Files',
        path: '/seller/pages/uploads',
        icon: <BsCloudUpload size={20} />
    },
    {
        title: 'Account',
        path: '/seller/pages/account',
        icon: <BsGear size={20} />
    }
]