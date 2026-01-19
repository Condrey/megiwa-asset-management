import { HomeIcon, LayoutDashboard, LucideIcon, ShapesIcon, Users2Icon } from "lucide-react";
import { allAssetTypes, assetTypes } from "./enums";
import { DashboardIcon } from "@radix-ui/react-icons";

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
export const staffListLinks: NavLink[] = [
  {
    title: "Family members",
    href: "/users/family-members",
    description: "View all family members",
  },
  {
    title: "Managerial users",
    href: "/users/management",
    description: "View management of all the assets",
  },
];
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
    children: allAssetTypes.map((a) => {
      const { title } = assetTypes[a];
      return { title, href: `/assets/${a}`, description: "" };
    }),
    showOnMediumScreen: true,
  },
  {
    title: "Users & Mg't",
    href: "/staff-lists",
    description: "View all staffs of Lira City council",
    icon: Users2Icon,
    children: staffListLinks,
    showOnMediumScreen: true,
  },
];
