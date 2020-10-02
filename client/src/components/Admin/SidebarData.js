import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as VsIcons from "react-icons/vsc";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Reservations",
    path: "/admin/reservations",
    icon: <RiIcons.RiReservedLine />,
    cName: "nav-text",
  },
  {
    title: "Schedule",
    path: "/admin/schedule",
    icon: <VsIcons.VscChecklist />,
    cName: "nav-text",
  },
  {
    title: "Availability",
    path: "/admin/availability",
    icon: <MdIcons.MdEventAvailable />,
    cName: "nav-text",
  },
  {
    title: "User list",
    path: "/admin/users",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Subscription",
    path: "/admin/subscription",
    icon: <MdIcons.MdSubscriptions />,
    cName: "nav-text",
  },
  {
    title: "Quick Setup",
    path: "/admin/quick-setup",
    icon: <SiIcons.SiQuicktime />,
    cName: "nav-text",
  },
  {
    title: "Site settings",
    path: "/admin/site-settings",
    icon: <MdIcons.MdSettings />,
    cName: "nav-text",
  },
  {
    title: "Resources",
    path: "/admin/resources",
    icon: <FaIcons.FaRegCalendarAlt />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/admin/reports",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Help",
    path: "/admin/help",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
