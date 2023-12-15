import FeedIcon from "@/svgs/sidebar/feeds";
import LiveStreamIcon from "@/svgs/sidebar/livestream";
import GroupsIcon from "@/svgs/groups";
import TrendingIcon from "@/svgs/sidebar/trending";
import SettingsIcon from "@/svgs/sidebar/settings";
import NotificationIcon from "@/svgs/sidebar/notifications";
import WalletIcon from "@/svgs/sidebar/wallet";
import SubscriptionIcon from "@/svgs/sidebar/subscription";
import HelpIcon from "@/svgs/sidebar/help";
import trending from '@/public/AdminFlowAssets/trending.png'

interface SidebarMenuItems {
  icon: React.FC<React.SVGProps<SVGSVGElement>> | string;
  title: string;
  route: string;
}

export const sidebarMenuItems: SidebarMenuItems[] = [
  {
    icon: FeedIcon,
    title: "Feeds",
    route: "/dashboard/feeds",
  },
  {
    icon: GroupsIcon,
    title: "Groups",
    route: "/dashboard/groups",
  },
  {
    icon: LiveStreamIcon,
    title: "Live Stream",
    route: "/dashboard/rooms",
  },
  {
    icon: TrendingIcon,
    title: "Trending",
    route: "/dashboard/trending",
  },
  {
    icon: NotificationIcon,
    title: "Notifications",
    route: "/dashboard/notifications",
  },
  {
    icon: SettingsIcon,
    title: "Settings",
    route: "/dashboard/settings",
  },
  {
    icon: SubscriptionIcon,
    title: "My Subscription",
    route: "/dashboard/subscription",
  },
  {
    icon: WalletIcon,
    title: "My Wallet",
    route: "/dashboard/wallet",
  },
  {
    icon: HelpIcon,
    title: "Help & Support",
    route: "/dashboard/help",
  },
];
