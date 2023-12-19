import {DepositWithdraw} from "@app/module/deposit_withdraw";
import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";

export default function DepositWithdrawPage() {
  const user1 = useSelector((state: IRootState) => state.user);
  return (
    <div>
      {user1?.userInformationDto?.roleName === "manager" ? (
        <DepositWithdraw />
      ) : (
        <div />
      )}
    </div>
  );
}
