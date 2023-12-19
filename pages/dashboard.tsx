import {Dashboard} from "@app/module/dashboard";
import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";

export default function DashboardPage() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <div>
      {user.userInformationDto?.roleName === "admin" ? <Dashboard /> : <div />}
    </div>
  );
}
