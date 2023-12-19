import React from "react";
import "./style.scss";
import {Image} from "antd";
import {MenuFoldOutlined, PhoneOutlined} from "@ant-design/icons";

interface IProps {
  dataInfoHelper?: any;
}
export function HelperInfo(props: IProps): JSX.Element {
  const {dataInfoHelper} = props;
  console.log(dataInfoHelper?.status);
  let status = dataInfoHelper?.status;
  if (status === "WAITING_FOR_APPROVE") {
    status = "Chờ phê duyệt";
  } else if (status === "WAITING_FOR_CONFIRM") {
    status = "Chờ xác nhận";
  }
  return (
    <div className="helper-info-container">
      <h3>THÔNG TIN</h3>
      <div className="avatar-helper">
        <Image
          preview={false}
          style={{borderRadius: "50%"}}
          width={150}
          height={150}
          src={
            dataInfoHelper?.personalAvatar ??
            "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
          }
        />
        <h3>{dataInfoHelper?.fullName}</h3>
      </div>
      <div className="list-attachment">
        {dataInfoHelper?.attachments.map((item: string, index: number) => (
          <Image
            key={index}
            className="image-attachment"
            width={60}
            height={60}
            src={
              item ??
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
          />
        ))}
      </div>
      <div className="list-info">
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.email}</div>
        </div>
        <div className="item-info">
          <PhoneOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.phoneNumber}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.dateOfBirth}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.placeOfResidence}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.homeTown}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{status}</div>
        </div>
        {/* <b className="title-exp">Kinh nghiệm</b> */}
        {/* <div className="description-exp">sssss</div> */}
      </div>
    </div>
  );
}
