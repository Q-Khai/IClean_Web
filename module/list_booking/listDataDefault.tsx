import {TabsProps} from "antd";

export const itemsTab: TabsProps["items"] = [
  {
    key: "all",
    label: "Tất cả",
  },
  {
    key: "NOT_YET",
    label: "Chưa duyệt",
  },
  {
    key: "APPROVED",
    label: "Đã duyệt",
  },
  {
    key: "REJECTED",
    label: "Đã từ chối",
  },
  {
    key: "FINISHED",
    label: "Đã hoàn thành",
  },
];
