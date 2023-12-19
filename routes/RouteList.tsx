import {ReactNode} from "react";
import {
  BlockOutlined,
  FileExclamationOutlined,
  IdcardOutlined,
  LineChartOutlined,
  LogoutOutlined,
  PicRightOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export interface IRoute {
  path: string;
  name: string;
  isSidebar: boolean;
  isLanding?: boolean;
  icon?: ReactNode;
  children?: IRoute[];
  isRole?: any;
}

const routes: IRoute[] = [
  {
    path: "/login",
    name: "Đăng nhập",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/manager_user",
    name: "Quản lý",
    isSidebar: true,
    icon: <UserOutlined className="icon-sidebar" />,
    isRole: "admin",
  },
  {
    path: "/list_booking",
    name: "Yêu cầu",
    isSidebar: true,
    icon: <PicRightOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_service",
    name: "Dịch vụ",
    isSidebar: true,
    icon: <BlockOutlined className="icon-sidebar" />,
    isRole: "admin",
  },
  {
    path: "/detail_service",
    name: "Chi tiết dịch vụ",
    isSidebar: false,
  },
  {
    path: "/list_apply",
    name: "Ứng tuyển",
    isSidebar: true,
    icon: <IdcardOutlined className="icon-sidebar" />,
  },
  {
    path: "/detail_apply",
    name: "Chi tiết ứng tuyển",
    isSidebar: false,
  },
  {
    path: "/list_report",
    name: "Khiếu nại",
    isSidebar: true,
    icon: <FileExclamationOutlined className="icon-sidebar" />,
    isRole: "manager",
  },
  {
    path: "/detail_report",
    name: "Chi tiết khiếu nại",
    isSidebar: false,
  },
  {
    path: "/profile",
    name: "Thông tin cá nhân",
    isSidebar: true,
    icon: <SettingOutlined className="icon-sidebar" />,
  },
  {
    path: "/deposit_withdraw",
    name: "Nạp rút tiền",
    isSidebar: true,
    icon: <LogoutOutlined className="icon-sidebar" />,
    isRole: "manager",
  },
  {
    path: "/dashboard",
    name: "Thống kê",
    isSidebar: true,
    icon: <LineChartOutlined className="icon-sidebar" />,
    isRole: "admin",
  },
  {
    path: "/setting",
    name: "Cấu hình",
    isSidebar: true,
    icon: <SettingOutlined className="icon-sidebar" />,
    isRole: "admin",
  },
];

export default routes;
