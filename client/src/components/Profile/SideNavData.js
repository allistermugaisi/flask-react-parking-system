import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const SideNavData = [
  {
    title: "Home",
    path: "/user-profile/dashboard",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Reservations",
    path: "/user-profile/reservations",
    icon: <RiIcons.RiReservedLine />,
    cName: "nav-text",
  },
  {
    title: "Offers",
    path: "/user-profile/offers",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Payments",
    path: "/user-profile/payments",
    icon: <MdIcons.MdPayment />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/user-profile/settings",
    icon: <MdIcons.MdSettings />,
    cName: "nav-text",
  },
  {
    title: "Help",
    path: "/user-profile/help",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
