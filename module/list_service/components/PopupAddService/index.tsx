import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  notification,
} from "antd";
import React, {useState} from "react";
import {FormServiceUnit} from "../FormServiceUnit";
import axios from "axios";
import {useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";

interface IProps {
  open: any;
  close: any;
}

export function PopupAddService(props: IProps) {
  const {open, close} = props;
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [unit, setUnit] = useState<number>(1);

  const userInfo = useSelector((state: IRootState) => state.user);
  const [serviceId, setServiceId] = useState<number>();

  console.log("user", userInfo);
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
    console.log(unit);
  };

  const tabList = [
    {
      key: "tab1",
      tab: "Thông tin dịch vụ",
    },
    {
      key: "tab2",
      tab: "Đơn vị 1",
    },
    {
      key: "tab3",
      tab: "Đơn vị 2",
    },
    {
      key: "tab4",
      tab: "Đơn vị 3",
    },
  ];

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const addService = async (values: any) => {
    console.log("values", values);
    try {
      const formData = new FormData();

      formData.append("serviceName", values.serviceName);
      formData.append("description", values.description);

      values.serviceFileImages.forEach((image: any, index: number) => {
        formData.append(`serviceFileImages`, image.originFileObj);
      });

      formData.append(
        "serviceAvatar",
        values.serviceAvatar.fileList[0].originFileObj
      );

      const response = await axios
        .post("https://iclean.azurewebsites.net/api/v1/service", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${userInfo.accessToken}`,
          },
        })
        .then((res) => {
          notification.success({
            message: "Thành công",
            description: "Thêm mới dịch vụ thành công.",
          });
          console.log("response", res.data);
          setServiceId(res.data.data)
          setActiveTabKey("tab2");
        });

    } catch (error) {
      // console.error('Lỗi khi upload ảnh:', error);
      // setUploadStatus('Upload thất bại!');
    }
  };

  const handleChangeUnit = (e: any) => {
    console.log(e);
    setUnit(e);
  };

  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <Form layout="vertical" onFinish={addService}>
        <Form.Item name="serviceName" label="Tên dịch vụ">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item>
          <Form.Item
            name="unit"
            label="Đơn vị tính"
            style={{display: "inline-block", width: "calc(50% - 16px)"}}
          >
            <Select
              defaultValue={unit}
              onChange={handleChangeUnit}
              options={[
                {value: 1, label: "m2"},
                {value: 4, label: "m3"},
                {value: 7, label: "người"},
                {value: 10, label: "hp"},
                {value: 13, label: "kg"},
              ]}
            />
          </Form.Item>
          <Form.Item
            name="serviceAvatar"
            label="Icon dịch vụ"
            style={{
              display: "inline-block",
              width: "calc(50% - 16px)",
              float: "right",
            }}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="serviceFileImages"
          label="Hình ảnh dịch vụ"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{marginTop: 8}}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{float: "right"}}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    ),
    tab2: <FormServiceUnit unitId={unit} serviceId={serviceId}/>,
    tab3: <FormServiceUnit unitId={unit + 1} serviceId={serviceId}/>,
    tab4: <FormServiceUnit unitId={unit + 2} serviceId={serviceId}/>,
  };

  return (
    <Modal
      className="border_radius"
      title="Thêm dịch vụ"
      open={open}
      footer={[]}
      onCancel={close}
      width={1000}
    >
      <Card
        className="border_radius"
        style={{width: "100%"}}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    </Modal>
  );
}
