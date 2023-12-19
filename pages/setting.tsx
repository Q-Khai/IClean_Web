import {Setting} from "@app/module/setting";
import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";

export default function SettingPage() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <div>
      {user?.userInformationDto?.roleName === "admin" ? <Setting /> : <div />}
    </div>
  );
}
