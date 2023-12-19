import "./index.scss";
import React from "react";
import {Tabs, TabsProps} from "antd";

export function TabGlobal(props: TabsProps): JSX.Element {
  return (
    <div className="tabContainer">
      <Tabs {...props} />
    </div>
  );
}
