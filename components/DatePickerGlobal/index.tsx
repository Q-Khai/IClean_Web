import "./index.scss";
import React from "react";
import {DatePicker, DatePickerProps} from "antd";

export function DatePickerGlobal(props: DatePickerProps): JSX.Element {
  return <DatePicker {...props} />;
}
