import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartSpline,
  LayoutDashboard,
  ShoppingBasket,
  ShoppingBag,
} from "lucide-react";
const items = [
  {
    id: 1,
    label: "Dashboard",
    icon: <LayoutDashboard />,
    navigate: "/admin/dashboard",
  },
  {
    id: 2,
    label: "Products",
    icon: <LayoutDashboard />,
    navigate: "/admin/products",
  },
  {
    id: 3,
    label: "Features",
    icon: <ShoppingBasket />,
    navigate: "/admin/features",
  },
  {
    id: 4,
    label: "Order",
    icon: <ShoppingBag />,
    navigate: "/admin/orders",
  },
];
function MenuItems() {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex flex-col  ">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className={`flex items-center gap-2 rounded-md px-4 py-3 cursor-pointer hover:bg-slate-200 ${
              window.location.pathname === item.navigate ? "bg-slate-200" : ""
            }`}
            onClick={() => navigate(item.navigate)}
          >
            {item.icon} <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
function AdminSidebar({ openSidebar, setOpenSidebar }) {
  const navigate = useNavigate();
  console.log(openSidebar);
  return (
    <Fragment>
      <aside
        className={`${
          openSidebar ? "block" : "hidden"
        } w-64 px-4 py-3 flex-col border-r bg-background lg:flex items-center`}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <ChartSpline />
          <h1
            onClick={() => navigate("/admin/dashboard")}
            className="text-xl  font-extrabold"
          >
            Admin Panel
          </h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
