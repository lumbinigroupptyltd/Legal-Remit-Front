import React from "react";
import { nanoid } from "nanoid";
const SendMoney = React.lazy(() => import("../screens/SendMoney/SendMoney"));

const UserRoutes = [
  {
    id: nanoid(),
    path: "/home/sendmoney",
    name: "Send Money",
    component: <SendMoney />,
  },
];

export { UserRoutes };
