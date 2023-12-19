import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, notification} from "antd";
import {
  IEditServceUnit,
  IServiceUnitDetail1,
  editServceUnit,
  getServiceUnitDetail,
} from "@app/api/ApiServiceUnit";
import {formatMoney} from "@app/utils/formatMoney";

interface IProps {
  serviceUnitId: number;
  unitDetail: string;
  defaultPrice: number;
}

export function FormServiceUnit(props: IProps) {
  const {serviceUnitId, unitDetail, defaultPrice} = props;

  const [dataInit, setDataInit] = useState<IServiceUnitDetail1>();

  useEffect(() => {
    getServiceUnitDetail(serviceUnitId)
      .then((res) => {
        console.log("Unit >>> ", res);
        setDataInit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  interface IDataItem {
    id: number,
    price: number,
    employeeCommission: number;
  }

  const handleOnFinish = (e: any) => {
    console.log(e);
    var a1 : IDataItem = {
      id: 1,
      price: e.price1 ? e.price1 : dataInit?.servicePrices[0].price,
      employeeCommission: e.commission1 ? e.commission1 : dataInit?.servicePrices[0].employeeCommission,
    }
    var a2 : IDataItem = {
      id: 2,
      price: e.price2 ? e.price2 : dataInit?.servicePrices[0].price,
      employeeCommission: e.commission2 ? e.commission2 : dataInit?.servicePrices[0].employeeCommission,
    }
    var a3 : IDataItem = {
      id: 3,
      price: e.price3 ? e.price3 : dataInit?.servicePrices[0].price,
      employeeCommission: e.commission3 ? e.commission3 : dataInit?.servicePrices[0].employeeCommission,
    }
    var a : IEditServceUnit = {
      defaultPrice: defaultPrice,
      helperCommission: 65,
      servicePriceRequests: [a1, a2, a3]
    }

    
    editServceUnit(serviceUnitId, a)
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Cập nhật giá thành công",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValues = {
    unit: unitDetail,
    defaultPrice: formatMoney(defaultPrice),
  };

  return (
    <div>
      <Form
        onFinish={handleOnFinish}
        initialValues={initialValues}
        // key={unitDetail}
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
          {dataInit?.servicePrices.map((item, index) => (
            <>
              <Col span={24}>
                <h4>{`${item.startTime} - ${item.endTime}`}</h4>
              </Col>
              <Col span={10}>
                <Form.Item name={`price${item.id}`} label="Giá">
                  <Input defaultValue={formatMoney(item.price)}></Input>
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item name={`commission${item.id}`} label="Hoa hồng">
                  <Input defaultValue={`${item.employeeCommission}%`}></Input>
                </Form.Item>
              </Col>
            </>
          ))}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{float: "right"}}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
