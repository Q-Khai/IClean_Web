import "./index.scss";
import React from "react";
import {Select, SelectProps} from "antd";

export function SlectOptionGlobal(props: SelectProps): JSX.Element {
  return <Select {...props} />;
}
