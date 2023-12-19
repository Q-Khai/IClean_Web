import {Tag} from "antd";
import React from "react";

interface CustomTagProps {
  title: string;
  color?: string;
  onClick?: () => void;
}

function CustomTag(Props: CustomTagProps): JSX.Element {
  const {title, color, onClick} = Props;
  return (
    <button
      type="button"
      onClick={onClick}
      style={onClick ? {cursor: "pointer"} : {cursor: "auto"}}
    >
      <Tag color={color}>{title}</Tag>
    </button>
  );
}

export default CustomTag;
