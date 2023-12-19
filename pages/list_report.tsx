import {ListReport} from "@app/module/list_report";
import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";

export default function ListReportPage() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <div>
      {user.userInformationDto?.roleName === "manager" ? (
        <ListReport />
      ) : (
        <div />
      )}
    </div>
  );
}
