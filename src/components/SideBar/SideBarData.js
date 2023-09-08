import { FaCalculator, FaTable, FaPlusSquare } from "react-icons/fa";

export const sideBardata = [
  {
    title: "Calculate Net/Gross salary",
    icon: <FaCalculator size={window.innerWidth < 600 ? 28 : 14} />,
    link: "/calculate",
  },
  {
    title: "Tax slices",
    icon: <FaTable size={window.innerWidth < 600 ? 28 : 14} />,
    link: "/tax-slices",
  },
  {
    title: "Add new tax slice",
    icon: <FaPlusSquare size={window.innerWidth < 600 ? 28 : 14} />,
    link: "/add",
  },
];
