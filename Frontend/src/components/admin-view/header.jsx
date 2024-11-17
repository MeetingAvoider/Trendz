import React from "react";
import { Menu, LogOut } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader() {
  return (
    <header className="flex justify-between items-center px-4 py-3">
      <Button className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">TOggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
