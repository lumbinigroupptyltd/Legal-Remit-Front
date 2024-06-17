import React from "react";
import { nanoid } from "nanoid";
const UserDashboard = React.lazy(() => import("../screens/Dashbord/UserDashboard"));
const NewSendMoney = React.lazy(() => import("../screens/SendMoney/NewSendMoney"));
const AboutUsPage = React.lazy(() => import("../screens/AboutUsPage/AboutUsPage"));
const ContactUsPage = React.lazy(() => import("../screens/ContactUsPage/ContactUsPage"));
const DevlopmentPage = React.lazy(() => import("../components/MaterialUI/DevelopmentPage"));

const UserRoutes = [
  {
    id: nanoid(),
    path: "dashboard",
    name: "Home",
    component: <UserDashboard />,
  },
  {
    id: nanoid(),
    path: "sendmoney",
    name: "Send Money",
    component: <NewSendMoney />,
  },
  {
    id: nanoid(),
    path: "about-us",
    name: "About Us",
    component: <AboutUsPage />,
  },
  {
    id: nanoid(),
    path: "contact-us",
    name: "Contact Us",
    component: <ContactUsPage />,
  },
  {
    id: nanoid(),
    path: "transaction",
    name: "Transactions",
    component: <DevlopmentPage />,
  },
  {
    id: nanoid(),
    path: "chats",
    name: "Chat",
    component: <DevlopmentPage />,
  },

];

export { UserRoutes };
