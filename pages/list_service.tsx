import {ListService} from "@app/module/list_service";
import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";

export default function ListServicePage() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <div>
      {user?.userInformationDto?.roleName === "admin" ? (
        <ListService />
      ) : (
        <div />
      )}
    </div>
  );
}
