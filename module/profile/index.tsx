import {FormOutlined} from "@ant-design/icons";
import {IUserData, getInfoUser} from "@app/api/ApiProfile";
import { IRootState } from "@app/redux/store";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Row,
  Upload,
  notification,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";

export function Profile(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData>();
  const userInfo = useSelector((state: IRootState) => state.user);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString);
  };


  useEffect(() => {
    getInfoUser()
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  const editInfo = () => {
    setIsEdit(false);
  };
  
  const handleImageChange = (info: any) => {
    console.log(info.file.status);
    if (info.file.status === "done") {
      console.log(info.file.response.url);
      setSelectedImage(info.file.response.url);
    }
  };
  

  const onFinish = async (values: any) => {
    console.log("values", values);
    try {
      const formData = new FormData();
      formData.append("fullName ",  values?.fullName ? values.fullName : userData?.fullName);
      formData.append("dateOfBirth ", selectedDate);
      console.log(selectedDate);

      formData.append(
        "fileImage",
        values.avatar.fileList[0].originFileObj
      );

      const response = await axios
        .put("https://iclean.azurewebsites.net/api/v1/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${userInfo.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          notification.success({
            message: "Thành công",
            description: "Cập nhật thông tin thành công.",
          });
        });

      console.log("response", response);
    } catch (error) {
      // console.error('Lỗi khi upload ảnh:', error);
      // setUploadStatus('Upload thất bại!');
    }
  };

  return (
    <div className="profile-container">
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Card style={{borderRadius: 12}}>
            {userData && (
              <Form
                name="profile"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <div style={{display: "flex", margin: "24px 0px"}}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      marginRight: "24px",
                    }}
                  >
                    <Image
                      src={selectedImage || userData?.avatar}
                      style={{objectFit: "cover", height: "100%"}}
                    />
                  </div>
                  <div>
                    <h2>{userData?.fullName}</h2>
                    <Form.Item name={"avatar"}>
                      <Upload
                        maxCount={1}
                        showUploadList={false}
                        onChange={handleImageChange}
                      >
                        <Button
                          style={{padding: "0", border: "none", color: "#1890ff"}}
                        >
                          Tải ảnh đại diện
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>
                <Form.Item label="Họ và tên" name="fullName">
                  <Row>
                    <Col span={22}>
                      <Input
                        value={userData?.fullName}
                        readOnly={isEdit}
                        size={"large"}
                        placeholder="Họ và tên"
                        style={{borderRadius: 6}}
                      />
                    </Col>
                    <Col
                      span={2}
                      style={{display: "flex", justifyContent: "end"}}
                    >
                      <Button
                        onClick={editInfo}
                        type="primary"
                        size="large"
                        icon={<FormOutlined />}
                      ></Button>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="Vai trò" name="roleName">
                  <Input
                    readOnly={isEdit}
                    style={{borderRadius: 6}}
                    size={"large"}
                    placeholder="Vai trò"
                    defaultValue={userData.roleName}
                  />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input
                    name="phoneNumber"
                    readOnly={isEdit}
                    size={"large"}
                    placeholder="Số điện thoại"
                    style={{borderRadius: 6}}
                    defaultValue={userData.phoneNumber}
                  />
                </Form.Item>

                <Form.Item label="DatePicker" name="dateOfBirth">
                  <DatePicker
                    style={{width: "100%", height: "40px", borderRadius: 6}}
                    inputReadOnly={true}
                    onChange={handleDateChange}
                    defaultValue={moment(userData.dateOfBirth)}
                  />
                </Form.Item>

                <Form.Item label="Địa chỉ" name="defaultAddress">
                  <Input
                    readOnly={isEdit}
                    size={"large"}
                    style={{borderRadius: 6}}
                    placeholder="Địa chỉ"
                    defaultValue={userData.defaultAddress}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{span: 20}}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{width: "200px", height: "40px", borderRadius: 6}}
                  >
                    Lưu
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
