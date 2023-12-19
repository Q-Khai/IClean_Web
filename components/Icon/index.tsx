import React from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
  UserAddOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {LoadingGlobal} from "@app/components/Loading";

interface IIcon {
  className?: string;
  color?: string;
  icon: string;
  size: string | number;
}

function Icon({
  color = "",
  size = "100%",
  icon,
  className = "",
}: IIcon): JSX.Element {
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
}

interface IconProps {
  onClick?: () => void;
  className?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  isLoading?: boolean;
}

function IconAdd(props: IconProps): JSX.Element {
  const {onClick, className} = props;
  return (
    <PlusCircleOutlined
      style={{color: "#1890FF", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

function IconDelete(props: IconProps): JSX.Element {
  const {onClick, className} = props;
  return (
    <DeleteOutlined
      style={{color: "#F5222D", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

function IconEdit(props: IconProps): JSX.Element {
  const {onClick, className, isLoading} = props;
  return isLoading ? (
    <LoadingGlobal size="small" />
  ) : (
    <EditOutlined
      style={{color: "#485CC7", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

function IconEye(props: IconProps): JSX.Element {
  const {onClick, className} = props;
  return (
    <EyeOutlined
      style={{color: "#40A9FF", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

function IconUserAdd(props: IconProps): JSX.Element {
  const {onClick, className} = props;
  return (
    <UserAddOutlined
      style={{color: "#7ACC00", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

function IconSetting(props: IconProps): JSX.Element {
  const {onClick, className} = props;
  return (
    <SettingOutlined
      style={{color: "#F5222D", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

function IconSave(props: IconProps): JSX.Element {
  const {onClick, className, isLoading} = props;
  return isLoading ? (
    <LoadingGlobal size="small" />
  ) : (
    <CheckOutlined
      style={{color: "#52C41A", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

function IconClose(props: IconProps): JSX.Element {
  const {onClick, className} = props;
  return (
    <CloseOutlined
      style={{color: "#F5222D", fontSize: "21px"}}
      onClick={onClick}
      className={className}
    />
  );
}

export {
  IconAdd,
  IconDelete,
  IconEdit,
  IconEye,
  IconSetting,
  IconSave,
  IconClose,
  Icon,
  IconUserAdd,
};
