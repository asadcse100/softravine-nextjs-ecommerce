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
    BsRepeat,
    BsCloudUpload,
    BsChatQuoteFill,
    BsPatchQuestion,
    BsArrowLeftRight,
    BsShop,
    BsCashStack,
    BsBalloonHeart,
    BsFillPeopleFill,
} from "react-icons/bs";
import { SideNavItem } from "@/../types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: "Dashboard",
        path: "/customer",
        icon: <BsHouseDoor size={20} />
    },
    {
        title: 'Eraning Balance',
        path: '/customer/pages/earning-balance',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Voucher Balance',
        path: '/customer/pages/voucher-balance',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Purchase History',
        path: '/customer/pages/purchase_history',
        icon: <BsCartPlus size={20} />
    },
    {
        title: 'Favoritelish',
        path: '/customer/pages/favoritelish',
        icon: <BsBalloonHeart size={20} />
    },
    {
        title: 'Compare',
        path: '/customer/pages/compare',
        icon: <BsRepeat size={20} />
    },
    {
        title: 'Followed Sellers',
        path: '/customer/pages/followed-seller',
        icon: <BsShop size={20} />
    },
    // {
    //     title: 'Classified Products',
    //     path: '/customer/pages/customer_products',
    //     icon: <BsFillPeopleFill size={20} />
    // },
    // {
    //     title: 'Auction',
    //     path: '/auction',
    //     icon: <BsBackpack4 size={20} />,
    //     submenu: true,
    //     subMenuItems: [
    //         { title: 'Bidded Products', path: '/customer/pages/auction/product_bids' },
    //         { title: 'Purchase History', path: '/customer/pages/auction/purchase_history' },
    //     ],
    // },
    {
        title: 'Refund Requests',
        path: '/customer/pages/sent-refund-request',
        icon: <BsCashStack size={20} />
    },
    // {
    //     title: 'Conversations',
    //     path: '/customer/pages/conversations',
    //     icon: <BsArrowLeftRight size={20} />
    // },
    {
        title: 'My Wallet',
        path: '/customer/pages/wallet',
        icon: <BsPatchQuestion size={20} />
    },
    {
        title: 'Earning Points',
        path: '/customer/pages/earning-points',
        icon: <BsPatchQuestion size={20} />
    },
    {
        title: 'Support Ticket',
        path: '/customer/pages/support_ticket',
        icon: <BsChatQuoteFill size={20} />
    },
    {
        title: 'Digital Product',
        path: '/customer/pages/digital-purchase-history',
        icon: <BsCloudUpload size={20} />
    },
    {
        title: 'Affiliate',
        path: '/affiliate',
        icon: <BsBackpack4 size={20} />,
        submenu: true,
        subMenuItems: [
            { title: 'Afiliate System', path: '/customer/pages/affiliate/user' },
            { title: 'Payment History', path: '/customer/pages/affiliate/payment_history' },
            { title: 'Withdraw Request History', path: '/customer/pages/affiliate/withdraw_request_history' },
        ],
    },
    {
        title: 'Manage Account',
        path: '/customer/pages/profile',
        icon: <BsGear size={20} />
    },
    // {
    //     title: 'Delete My Account',
    //     path: '#',
    //     icon: <BsGear size={20} />
    // }
]