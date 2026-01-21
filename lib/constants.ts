import {
  LayoutDashboard,
  LucideIcon,
  ShapesIcon,
  Users2Icon,
} from "lucide-react";
import { allAssetTypes, allRoles, assetTypes, roles } from "./enums";

export const assetTabTriggers: string[] = [
  "details",
  "finances",
  "units",
  "legalCases",
  "documents",
];

export const financeTabTriggers: string[] = [
  "valuations",
  "incomes",
  "expenses",
];

export const MAX_ATTACHMENTS = 5;
export const REDIRECT_TO_URL_SEARCH_PARAMS = "redirectToUrl";

export type NavLink = { title: string; href: string; description: string };
export type NavLinkGroup = {
  title: string;
  href: string;
  showOnMediumScreen: boolean;
  description: string;
  children: NavLink[];
  icon?: LucideIcon;
};

export const navLinks: NavLinkGroup[] = [
  {
    title: "Dashboard",
    href: "/",
    description: "",
    icon: LayoutDashboard,
    children: [],
    showOnMediumScreen: true,
  },
  {
    title: "Assets",
    href: "/assets",
    description: "View all the assets",
    icon: ShapesIcon,
    children: [
      { title: "All Assets", href: "/assets", description: "" },
      ...allAssetTypes.map((a) => {
        const { title } = assetTypes[a];
        return { title, href: `/assets/${a}`, description: "" };
      }),
    ],
    showOnMediumScreen: true,
  },
  {
    title: "Users & Mg't",
    href: "/management/all",
    description: "View all staffs of Lira City council",
    icon: Users2Icon,
    children: [
      {
        title: "All users and managers",
        href: "/management/all",
        description: "",
      },
      ...allRoles.map((a) => {
        const { title } = roles[a];
        return { title, href: `/management/${a}`, description: "" };
      }),
    ],
    showOnMediumScreen: true,
  },
];

export const DEFAULT_PASSWORD = "defaultPassword123!";
