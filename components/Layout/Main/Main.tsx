import React from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../../../redux/store";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({children}: MainProps): JSX.Element {
  const isOpen = useSelector((state: IRootState) => state.menu.isOpen);

  const classNameMain = `"main " + ${
    isOpen ? "main_sidebar_open" : "main_sidebar_close"
  }`;

  return <div className={classNameMain}>{children}</div>;
}
