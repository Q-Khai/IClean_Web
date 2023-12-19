import { IReport, getReportById, putReportRefund } from "@app/api/ApiReport";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import "./style.scss";
import TextArea from "antd/lib/input/TextArea";
import { formatMoney } from "@app/utils/formatMoney";

export function DetailReport(): JSX.Element {
  const [dataInit, setDataInit] = useState<any>(undefined);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const getDataReport = (): Promise<IReport> =>
    getReportById(
      router?.query?.id ? parseInt(router.query.id as string, 10) : 1
    );
  const getdata = useQuery(["GET_DATA_DATAIL_REPORT"], getDataReport, { //getDataReport - lấy dữ liệu
    onSuccess: (res) => {
      setDataInit(res.data);
      console.log(res);
    },
  });
  console.log("Data detail: ", dataInit);

  useEffect(() => {
    getdata.refetch();
  }, [router.query.id as string]);
  const handleFinish = (value: any) => {
    setLoading(true);
    console.log(value);
    const id = router?.query?.id ? parseInt(router.query.id as string, 10) : 1;
    putReportRefund(id, value)
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Yêu cầu thành công",
          description: "Yêu cầu của bạn đã được xử lý thành công.",
        });
        router.push("/list_report");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Lỗi",
          description: "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const customer = [
    {
      label: "Tên",
      defaultValue: dataInit?.fullName,
      span: 12,
    },
    {
      label: "Lý do báo cáo",
      defaultValue: dataInit?.reportTypeDetail,
      span: 12,
    },
    {
      label: "Số điện thoại",
      defaultValue: dataInit?.phoneNumber,
      span: 12,
    },
    {
      label: "Chi tiết",
      defaultValue: dataInit?.detail,
      span: 12,
    },
  ];

  const service = [
    {
      label: "Dịch vụ",
      defaultValue: dataInit?.bookingDetail?.serviceName,
      span: 12,
    },
    {
      label: "Ngày thực hiện",
      defaultValue: dataInit?.bookingDetail?.workDate,
      span: 12,
    },
    {
      label: "Nhân viên thực hiện",
      defaultValue: dataInit?.bookingDetail?.helper?.helperName,
      span: 12,
    },
    {
      label: "Điện thoại",
      defaultValue: dataInit?.phoneNumber,
      span: 12,
    },
    {
      label: "Diện tích",
      defaultValue: dataInit?.bookingDetail?.value,
      span: 12,
    },
    {
      label: "Giá dịch vụ",
      defaultValue: formatMoney(dataInit?.bookingDetail?.price),
      span: 12,
    },
    {
      label: "Địa chỉ khách hàng",
      defaultValue: dataInit?.bookingDetail?.address?.locationDescription,
      span: 12,
    },
    {
      label: "Mã đơn hàng",
      defaultValue: dataInit?.bookingDetailId,
      span: 12,
    },
  ];

  return (
    <div className="detail_report_container">
      <Card className="detail_report" style={{ borderRadius: 12 }}>
        <h2 className="title">Khách hàng</h2>
        <Row gutter={[60, 32]}>
          {customer.map((item) => {
            return (
              <Col span={item.span}>
                <div className="report_item">
                  <span>{item.label}</span>
                  <Input
                    value={item.defaultValue}
                    className="report_item-info"
                    style={{ borderRadius: 6 }}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
        <h2 className="title">Chi tiết dịch vụ</h2>
        <Row gutter={[60, 32]}>
          {service.map((item) => {
            return (
              <Col span={item.span}>
                <div className="report_item">
                  <span>{item.label}</span>
                  <Input
                    value={item.defaultValue}
                    className="report_item-info"
                    style={{ borderRadius: 6 }}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
        {/* {dataInit?.reportStatus === "PROCESSING" && ( */}
        <div>
          <h2 className="title">Hình ảnh chứng minh</h2>
          <Row>
            {dataInit?.attachmentResponses.map((item: any, index: number) => (
              <Col span={3} key={index}>
                <Image
                  src={item.bookingAttachmentLink}
                  width={150}
                  height={150}
                  className="img"
                />
              </Col>
            ))}
          </Row>
        </div>
        {/* )} */}
      </Card>
      {dataInit?.reportStatus === "PROCESSING" && (
        <Card className="refund" style={{ borderRadius: 12 }}>
          <Form onFinish={handleFinish}>
            <Row gutter={[20, 20]}>
              <Col span={4}>
                <Form.Item name="refundPercent" label="Mức đền bù">
                  <Select
                    defaultValue={0}
                    style={{ width: 120 }}
                    options={[
                      { value: "20", label: "20%" },
                      { value: "30", label: "30%" },
                      { value: "40", label: "40%" },
                      { value: "0", label: "Không đền bù" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={18}>
                <Form.Item name="reason" label="Lý do">
                  <TextArea rows={6} />
                </Form.Item>
              </Col>
            </Row>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
              className="btn"
            >
              Xác nhận
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
}
