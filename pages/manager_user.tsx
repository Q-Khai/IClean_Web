import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";
import ManagerUser from ".";

export default function ManagerUserPage() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <div>
      {user.userInformationDto?.roleName === "admin" ? (
        <ManagerUser />
      ) : (
        <div />
      )}
    </div>
  );
}
