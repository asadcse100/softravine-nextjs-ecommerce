import { BsGear, BsHouseDoor, BsKanban, BsListUl } from "react-icons/bs";
import { SideNavItem } from "@/../types/types";

export const SIDENAV_ITEMS:SideNavItem[] = [
    {
        title:"Dashboard",
        path:"/",
        icon: <BsHouseDoor size={20}/>
    },
    {
        title:"POS",
        path:"/pos",
        icon: <BsHouseDoor size={20}/>
    },
    {
        title: 'Products',
        path: '/',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All', path: '/seller/pages/product/products'},
            {title: 'Category Wise Discount', path: '/products/new'},
            {title: 'Bulk Upload', path: '/products/new'},
            {title: 'Digital Products', path: '/products/new'},
            {title: 'Product Reviews', path: '/products/new'},
        ],
    },
    {
        title: 'Uploaded Files',
        path: '/u',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Package',
        path: '/package',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All', path: '/package'},
            {title: 'Purchase', path: '/products/new'},
        ],
    },
    {
        title: 'Coupon',
        path: '/coupon',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Wholesale Products',
        path: '/coupon',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Auction Products',
        path: '/coupon',
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
            {title: 'All', path: '/package'},
            {title: 'Orders', path: '/products/new'},
        ]
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Received Refund',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Shop Setting',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Payment History',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Money Withdraw',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Commission History',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Conversions',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Product Queries',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Support Ticket',
        path: '/orders',
        icon: <BsListUl size={20} />
    },
    {
        title: 'Account',
        path: '/account',
        icon: <BsGear size={20} />
    }
]