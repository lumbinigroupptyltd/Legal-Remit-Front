import React from "react";
import { nanoid } from "nanoid";
const NewSendMoney = React.lazy(() => import("../screens/SendMoney/NewSendMoney"));

const UserRoutes = [
  {
    id: nanoid(),
    path: "sendmoney",
    name: "Send Money",
    component: <NewSendMoney />,
  },
];

export { UserRoutes };
