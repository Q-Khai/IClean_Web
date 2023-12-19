import {
  IServiceUnitDetail,
  IUnit,
  createServiceUnit,
  getUnit,
} from "@app/api/ApiServiceUnit";
import {formatMoney} from "@app/utils/formatMoney";
import {Button, Col, Form, Input, Row, notification} from "antd";
import React, {useEffect, useState} from "react";

interface IProps {
  unitId: number;
  serviceId?: number;
}

export function FormServiceUnit(props: IProps) {
  const {unitId, serviceId} = props;

  const [unit, setUnit] = useState<IUnit[]>([]);

  useEffect(() => {
    getUnit()
      .then((res) => {
        console.log("Unit >>> ", res);
        setUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnFinish = (e: any) => {
    console.log("service id >> ", serviceId);
    const data: IServiceUnitDetail = {
      defaultPrice: 100000,
      helperCommission: 65,
      unitId: unitId,
      serviceId: serviceId,
      servicePrices: [
        {
          id: 1,
          price: parseInt(e.price1),
          employeeCommission: parseInt(e.commission1),
        },
        {
          id: 2,
          price: parseInt(e.price2),
          employeeCommission: parseInt(e.commission2),
        },
        {
          id: 3,
          price: parseInt(e.price3),
          employeeCommission: parseInt(e.commission3),
        },
      ],
    };
    console.log(data);
    createServiceUnit(data)
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Thêm đơn vị tính thành công"
        })
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Thêm đơn vị tính không thành công"
        })
      });
  };

  const initialValues = {
    unit: unit[unitId - 1]?.unitDetail,
    defaultPrice: formatMoney(100000),
  };

  return (
    <div>
      {unit[unitId - 1]?.unitDetail && (
        <Form
          onFinish={handleOnFinish}
          initialValues={initialValues}
          key={unitId}
        >
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <h4>Chi tiết dịch vụ</h4>
            </Col>
            <Col span={10}>
              <Form.Item name="unit" label="Đơn vị">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="defaultPrice" label="Mặc định">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <h4>7:00 - 12:00</h4>
            </Col>
            <Col span={10}>
              <Form.Item name="price1" label="Giá">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="commission1" label="Hoa hồng">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <h4>12:00 - 18:00</h4>
            </Col>
            <Col span={10}>
              <Form.Item name="price2" label="Giá">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="commission2" label="Hoa hồng">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <h4>18:00 - 24:00</h4>
            </Col>
            <Col span={10}>
              <Form.Item name="price3" label="Giá">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="commission3" label="Hoa hồng">
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{float: "right"}}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
