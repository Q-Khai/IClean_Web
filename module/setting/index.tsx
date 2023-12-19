import {
  ISystemParameter,
  editSystemParameter,
  getSystemParameter,
} from "@app/api/ApiSystem";
import {Button, Card, Col, Form, Input, Row, notification} from "antd";
import React, {useEffect, useState} from "react";

export function Setting() {
  const [dataInit, setDataInit] = useState<ISystemParameter[]>();
  useEffect(() => {
    getSystemParameter()
      .then((res) => {
        console.log(res.data);
        setDataInit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: any) => {
    var a = [];
    var i = 0;
    if (e.max_update_minutes != undefined) {
      console.log(e.max_update_minutes);
      a[i++] = {
        parameterId: 1,
        parameterValue: e.max_update_minutes,
      };
    }
    if (e.max_end_time_minutes != undefined) {
      console.log(e.max_end_time_minutes);
      a[i++] = {
        parameterId: 2,
        parameterValue: e.max_end_time_minutes,
      };
    }
    if (e.max_distance != undefined) {
      console.log(e.max_distance);
      a[i++] = {
        parameterId: 3,
        parameterValue: e.max_distance,
      };
    }
    if (e.point_to_money != undefined) {
      console.log(e.point_to_money);
      a[i++] = {
        parameterId: 4,
        parameterValue: e.point_to_money,
      };
    }
    if (e.request_booking_count != undefined) {
      console.log(e.request_booking_count);
      a[i++] = {
        parameterId: 5,
        parameterValue: e.request_booking_count,
      };
    }
    if (e.delay_minutes != undefined) {
      console.log(e.delay_minutes);
      a[i++] = {
        parameterId: 6,
        parameterValue: e.delay_minutes,
      };
    }
    if (e.max_minutes_send_money != undefined) {
      console.log(e.max_minutes_send_money);
      a[i++] = {
        parameterId: 7,
        parameterValue: e.max_minutes_send_money,
      };
    }
    if (e.max_minutes_cancel_booking != undefined) {
      console.log(e.max_minutes_cancel_booking);
      a[i++] = {
        parameterId: 8,
        parameterValue: e.max_minutes_cancel_booking,
      };
    }
    if (e.otp_message_default != undefined) {
      console.log(e.otp_message_default);
      a[i++] = {
        parameterId: 9,
        parameterValue: e.otp_message_default,
      };
    }
    console.log(a);
    editSystemParameter(a)
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Thành công",
          description: "Cài đặt hệ thống thành công",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Không thành công",
          description: "Cài đặt hệ thống không thành công",
        });
      });
  };

  const genLabel = (name: string): string => {
    if (name === "max_update_minutes") {
      return "Số phút cập nhật tối đa";
    } else if (name === "max_end_time_minutes") {
      return "Số phút tối đa kết thúc";
    } else if (name === "max_distance") {
      return "Khoảng cách tối đa";
    } else if (name === "point_to_money") {
      return "Điểm";
    } else if (name === "request_booking_count") {
      return "Số lượng yêu cầu đặt dịch vụ";
    } else if (name === "delay_minutes") {
      return "Thời gian được phép trễ (phút)";
    } else if (name === "max_minutes_send_money") {
      return "Thời gian tối đa để gửi tiền";
    } else if (name === "max_minutes_cancel_booking") {
      return "Thời gian tối đa để huỷ dịch vụ";
    } else if (name === "otp_message_default") {
      return "Tin nhắn hệ thống";
    }
    return "";
  };

  return (
    <div>
      <Card className="border_radius">
        <h2>Thông số</h2>
        <Form onFinish={handleSubmit} layout="vertical">
          <Row gutter={[48, 24]}>
            {dataInit?.map((item, index) => (
              <Col span={12} key={index}>
                <Form.Item
                  name={item.parameterField}
                  label={genLabel(item.parameterField)}
                >
                  <Input
                    style={{borderRadius: 6}}
                    defaultValue={item.parameterValue}
                  ></Input>
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Button type="primary" htmlType="submit" style={{float: "right"}}>
            Lưu
          </Button>
        </Form>
      </Card>
    </div>
  );
}
