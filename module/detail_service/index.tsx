import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Card, Form, Image, Input, Upload, notification} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {IService, getServiceById} from "@app/api/ApiService";
import TextArea from "antd/lib/input/TextArea";

import {IServiceUnit, getAllServiceUnit} from "@app/api/ApiServiceUnit";
import {FormServiceUnit} from "./components/FormServiceUnit";
import "./index.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "@app/redux/store";

export function DetailService() {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [dataInit, setDataInit] = useState<IService>();
  const [serviceUnit, setServiceUnit] = useState<IServiceUnit[]>([]);
  const router = useRouter();
  const userInfo = useSelector((state: IRootState) => state.user);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const serviceId = router?.query?.id
    ? parseInt(router.query.id as string, 10)
    : 1;

  useEffect(() => {
    getServiceById(serviceId)
      .then((res) => {
        console.log("service >>> ", res.data);
        setDataInit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllServiceUnit({serviceId: serviceId})
      .then((res) => {
        console.log(res);
        setServiceUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const onFinish = async (values: any) => {
      console.log("values", values);
      try {
        const formData = new FormData();

        const name = values.serviceName ? values.serviceName : dataInit?.serviceName
        const des = values.description ? values.description : dataInit?.description
  
        formData.append("serviceName", name);
        formData.append("description", des);
  
        const endPoint = `https://iclean.azurewebsites.net/api/v1/service/${serviceId}`
        const response = await axios
          .put(endPoint , formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${userInfo.accessToken}`,
            },
          })
          .then((res) => {
            notification.success({
              message: "Thành công",
              description: "Cập nhật dịch vụ thành công.",
            });
            console.log("response", res.data);
          })
          .catch((err) => {
            console.log(err);
            notification.error({
              message: "Không thành công",
              description: "Cập nhật dịch vụ không thành công.",
            });
          })
  
      } catch (error) {
        // console.error('Lỗi khi upload ảnh:', error);
        // setUploadStatus('Upload thất bại!');
      }
  };

  console.log("dataInit", dataInit);
  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <div>
        {dataInit && (
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="serviceName" label="Tên dịch vụ">
              <Input type="text" defaultValue={dataInit?.serviceName} />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <TextArea rows={8} defaultValue={dataInit?.description} />
            </Form.Item>
            <Form.Item name="serviceAvatar" label="Icon dịch vụ">
              <div className="d_flex">
                <div className="me_2">
                  <Image src={dataInit?.serviceIcon} width={102} height={102} />
                </div>
                <Upload listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{marginTop: 8}}>Chọn icon</div>
                  </div>
                </Upload>
              </div>
            </Form.Item>
            <Form.Item
              name="serviceFileImages"
              label="Hình ảnh dịch vụ"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <div className="d_flex">
                {dataInit?.images.map((item, i) => (
                  <div key={i} className="me_2">
                    <Image src={item.serviceImage} width={102} height={102} />
                  </div>
                ))}
                <div>
                  <Upload listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div style={{marginTop: 8}}>Thêm ảnh</div>
                    </div>
                  </Upload>
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{float: "right"}}>
                Lưu
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    ),
    tab2: (
      <FormServiceUnit
        key={1}
        serviceUnitId={serviceUnit[0]?.serviceUnitId}
        unitDetail={serviceUnit[0]?.unitDetail}
        defaultPrice={serviceUnit[0]?.defaultPrice}
      />
    ),
    tab3: (
      <FormServiceUnit
        key={2}
        serviceUnitId={serviceUnit[1]?.serviceUnitId}
        unitDetail={serviceUnit[1]?.unitDetail}
        defaultPrice={serviceUnit[1]?.defaultPrice}
      />
    ),
    tab4: (
      <FormServiceUnit
        key={3}
        serviceUnitId={serviceUnit[2]?.serviceUnitId}
        unitDetail={serviceUnit[2]?.unitDetail}
        defaultPrice={serviceUnit[2]?.defaultPrice}
      />
    ),
  };

  return (
    <Card
      style={{width: "100%"}}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {contentList[activeTabKey]}
    </Card>
  );
}
