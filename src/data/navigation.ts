import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/app/frontend/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/frontend/pages/collection", name: "Category Page" },
      { id: ncNanoId(), href: "/frontend/pages/product-detail", name: "Product Page" },
      { id: ncNanoId(), href: "/frontend/pages/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/frontend/pages/checkout", name: "Checkout Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/frontend/pages/search", name: "Search Page" },
      { id: ncNanoId(), href: "/frontend/pages/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/frontend/pages/account", name: "Accout Page" },
      { id: ncNanoId(), href: "/frontend/pages/account-order", name: "Order Page" },
      { id: ncNanoId(), href: "/frontend/pages/subscription", name: "Subscription" },
      { id: ncNanoId(), href: "/frontend/pages/contact", name: "Contact Page" },
      { id: ncNanoId(), href: "/auth/login", name: "Login" },
      { id: ncNanoId(), href: "/auth/signup", name: "Signup" },
      { id: ncNanoId(), href: "/auth/forgot-pass", name: "Forgot Password" },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/frontend/pages/blog",
    name: "Blog Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/frontend/pages/blog",
        name: "Blog Page",
      },
      {
        id: ncNanoId(),
        href: "/frontend/pages/blog-single",
        name: "Blog Single",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "#",
    name: "Service",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
  {
    id: ncNanoId(),
    href: "/frontend/pages/blog",
    name: "Blog",
  },
  {
    id: ncNanoId(),
    href: "/frontend/pages/about",
    name: "About Us",
  },
];
