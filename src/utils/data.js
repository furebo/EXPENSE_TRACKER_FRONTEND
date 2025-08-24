import { FaTachometerAlt, FaCoins, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";
export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: FaTachometerAlt,
    path: "/dashboard"
  },
  {
    id: "02",
    label: "Income",
    icon: FaCoins,
    path: "/income"
  },
  {
    id: "03",
    label: "Expense",
    icon: FaMoneyBillWave,
    path: "/expanse"
  },
  {
    id: "04",
    label: "Logout",
    icon: FaSignOutAlt,
    path: "/logout"
  }
];
