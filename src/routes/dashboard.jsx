// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Schedule from "@material-ui/icons/Schedule";
import Home from "@material-ui/icons/Home";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import HomePage from "pages/HomePage.jsx";
import MeetingPage from "pages/MeetingPage.jsx";
import InProgress from "pages/InProgress.jsx";
import CreateMeeting from "pages/CreateMeeting.jsx";

export const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: "首页",
    navbarName: "首页",
    icon: Home,
    component: HomePage
  },
  {
    path: "/inprogress",
    sidebarName: "进行中",
    navbarName: "进行中",
    icon: Schedule,
    component: InProgress
  },
  {
    path: "/createMeeting",
    sidebarName: "创建会议",
    navbarName: "创建会议",
    icon: LibraryAdd,
    component: CreateMeeting
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },

  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
  },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

let routesNotInSideBar = [
  {
    path: "/meeting/:meetingId",
    component: MeetingPage
  },
];

export const deepRoutes = routesNotInSideBar.concat(dashboardRoutes);
