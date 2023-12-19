import React from "react";
import "./index.scss";
import {Button} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

export interface ButtonGlobalProps {
  title: string;
  type?:
    | "default"
    | "primary"
    | "danger"
    | "green"
    | "primary-filled"
    | "delete"
    | "excel"
    | "add"
    | "statusYes"
    | "statusNo"
    | "statusPrimary"
    | "statusDefault";
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  key?: string | number;
}

export interface GroupButtonGlobalProps {
  listButton: ButtonGlobalProps[];
}

function ButtonGlobal(props: ButtonGlobalProps): JSX.Element {
  const {
    title,
    type = "default",
    onClick,
    startIcon,
    endIcon,
    className,
    loading,
    disabled,
    key,
  } = props;

  const renderType = (): string => {
    switch (type) {
      case "delete":
        return "danger";
      case "excel":
        return "green";
      case "add":
        return "primary";
      case "statusYes":
        return "colorYes";
      case "statusNo":
        return "colorNo";
      case "statusPrimary":
        return "colorStatusPrimary";
      case "statusDefault":
        return "colorStatusDefault";
      default:
        return type;
    }
  };

  const renderStartIcon = (): React.ReactNode => {
    switch (type) {
      case "delete":
        return <DeleteOutlined style={{color: "#F5222D", fontSize: "16px"}} />;
      case "excel":
        return (
          <FileExcelOutlined style={{color: "#52C41A", fontSize: "16px"}} />
        );
      case "add":
        return <PlusOutlined style={{color: "#1890FF", fontSize: "16px"}} />;
      default:
        return startIcon;
    }
  };

  return (
    <div className="button-global-container">
      <Button
        key={key}
        className={[renderType(), "button", className].join(" ")}
        onClick={onClick}
        loading={loading}
        disabled={disabled}
      >
        <div className="start-icon">{renderStartIcon()}</div>
        <div>{title}</div>
        <div className="end-icon">{endIcon}</div>
      </Button>
    </div>
  );
}

function ButtonGroupGlobal(props: GroupButtonGlobalProps): JSX.Element {
  const {listButton} = props;
  return (
    <div className="filterGroupGlobal-container">
      {listButton &&
        listButton?.map((item, index) => (
          <ButtonGlobal
            loading={item.loading}
            key={index}
            title={item.title}
            type={item.type}
            onClick={item.onClick}
            startIcon={item.startIcon}
            endIcon={item.endIcon}
            className={index !== 0 ? "btn-group-item" : ""}
            disabled={item.disabled}
          />
        ))}
    </div>
  );
}
export {ButtonGlobal, ButtonGroupGlobal};
