// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Payment from "layouts/payment/Payment";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import SignUp from "layouts/authentication/sign-up";

const routes = [

  { type: "title" },

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <Office size="12px" />,
    component: <Users />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Course",
    key: "course",
    route: "/course",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Payment",
    key: "payment",
    route: "/payment",
    icon: <CreditCard size="12px" />,
    component: <Payment />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Post",
  //   key: "post",
  //   // route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },

  {
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <SpaceShip size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
