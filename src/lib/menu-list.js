import { Users, Settings, SquarePen, LayoutGrid, Layers, Network, Database, Cpu, Share2, ShieldCheck, Activity, Zap, Cloud, BookOpen } from "lucide-react"

const POSTS_NEW_PATH = "/posts/new"

/**
 * Returns the dashboard menu group configuration.
 * @param {string} pathname - The current pathname.
 * @returns {object} The dashboard menu group object.
 */
const getDashboardMenuGroup = (pathname) => ({
  groupLabel: "",
  menus: [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
      icon: LayoutGrid,
      submenus: [],
    },
  ],
})

/**
 * Returns the modules menu group configuration.
 * @param {string} pathname - The current pathname.
 * @returns {object} The modules menu group object.
 */
const getModulesMenuGroup = (pathname) => ({
  groupLabel: "Modules",
  menus: [
    {
      href: "/foundations",
      label: "Foundations",
      active: pathname.includes("/foundations"),
      icon: Layers,
      submenus: [],
    },
    {
      href: "/networking",
      label: "Networking",
      active: pathname.includes("/networking"),
      icon: Network,
      submenus: [],
    },
    {
      href: "/data-architecture",
      label: "Data Architecture",
      active: pathname.includes("/data-architecture"),
      icon: Database,
      submenus: [],
    },
    {
      href: "/compute-runtime",
      label: "Compute & Runtime",
      active: pathname.includes("/compute-runtime"),
      icon: Cpu,
      submenus: [],
    },
    {
      href: "/apis-integration",
      label: "APIs & Integration",
      active: pathname.includes("/apis-integration"),
      icon: Share2,
      submenus: [],
    },
    {
      href: "/reliability-resilience",
      label: "Reliability & Resilience",
      active: pathname.includes("/reliability-resilience"),
      icon: Zap,
      submenus: [],
    },
    {
      href: "/security-governance",
      label: "Security & Governance",
      active: pathname.includes("/security-governance"),
      icon: ShieldCheck,
      submenus: [],
    },
    {
      href: "/observability-operations",
      label: "Observability & Operations",
      active: pathname.includes("/observability-operations"),
      icon: Activity,
      submenus: [],
    },
    {
      href: "/cloud-comparisons",
      label: "Cloud Comparisons",
      active: pathname.includes("/cloud-comparisons"),
      icon: Cloud,
      submenus: [],
    },
    {
      href: "/case-studies",
      label: "Case Studies",
      active: pathname.includes("/case-studies"),
      icon: BookOpen,
      submenus: [],
    },
  ],
})

/**
 * Returns the contents menu group configuration.
 * @param {string} pathname - The current pathname.
 * @returns {object} The contents menu group object.
 */
const getContentsMenuGroup = (pathname) => ({
  groupLabel: "Contents",
  menus: [
    {
      href: "",
      label: "Posts",
      active: pathname.includes("/posts"),
      icon: SquarePen,
      submenus: [
        {
          href: "/posts",
          label: "All Posts",
          active: pathname === "/posts",
        },
        {
          href: POSTS_NEW_PATH,
          label: "New Post",
          active: pathname === POSTS_NEW_PATH,
        },
      ],
    },
  ],
})

/**
 * Returns the settings menu group configuration.
 * @param {string} pathname - The current pathname.
 * @returns {object} The settings menu group object.
 */
const getSettingsMenuGroup = (pathname) => ({
  groupLabel: "Settings",
  menus: [
    {
      href: "/users",
      label: "Users",
      active: pathname.includes("/users"),
      icon: Users,
      submenus: [],
    },
    {
      href: "/account",
      label: "Account",
      active: pathname.includes("/account"),
      icon: Settings,
      submenus: [],
    },
  ],
})

/**
 * Returns the complete menu list configuration.
 * @param {string} pathname - The current pathname.
 * @returns {Array<object>} The array of menu group objects.
 */
export const getMenuList = (pathname) => [
  getDashboardMenuGroup(pathname),
  getModulesMenuGroup(pathname),
  getContentsMenuGroup(pathname),
  getSettingsMenuGroup(pathname),
]
