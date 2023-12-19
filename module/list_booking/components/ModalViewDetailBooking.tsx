import React, {useEffect, useState} from "react";
import {Button, Image, Input, Tag, notification} from "antd";
import {
  getDetailBooking,
  IDetailBookingRes,
  rejectAproveBooking,
  sendMoney,
} from "@app/api/ApiProduct";
import {useMutation, useQuery} from "react-query";
import {formatDateTime} from "@app/utils/formatTime";
import {formatMoney} from "@app/utils/formatMoney";
import {ModalDeleteBooking} from "./ModalDeleteBooking";

interface IProps {
  bookingId: number | undefined;
  handleCancel: any;
  refetchListBooking: any;
}
export function ModalViewDetailBooking(props: IProps): JSX.Element {
  const {bookingId, handleCancel, refetchListBooking} = props;
  const [dataDetailBookingInit, setDataDetailBookingInit] = useState<
    IDetailBookingRes | undefined
  >(undefined);
  const [isModalDeleteBooking, setIsModalDeleteBooking] = useState(false);

  const acceptBookingMutate = useMutation(rejectAproveBooking);

  const handleAcceptBooking = () => {
    if (bookingId) {
      acceptBookingMutate.mutate(
        {
          id: bookingId,
          action: "approved",
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Phê duyệt thành công!",
            });
            // dataListBooking.refetch();
            handleCancel();
            refetchListBooking();
          },
        }
      );
    }
  };

  const handleCancelDelete = () => {
    setIsModalDeleteBooking(false);
  };

  const showModalDeleteBooking = () => {
    setIsModalDeleteBooking(true);
  };

  const getDataDetailBooking = (): Promise<IDetailBookingRes> =>
    // IGetAllBookingRes
    getDetailBooking({
      id: bookingId ?? 1,
    });

  console.log("dataDetailBookingInit?.data?", dataDetailBookingInit?.data);
  const {refetch} = useQuery(
    ["GET_DATA_DETAIL_BOOKING"],
    getDataDetailBooking,
    {
      onSuccess: (res) => {
        setDataDetailBookingInit(res);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [bookingId]);

  // eslint-disable-next-line react/no-unstable-nested-components
  function ItemInput(props: {title: string; value: any}): React.JSX.Element {
    const {title, value} = props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        <div style={{width: "35%", color: "#495057", fontWeight: "500"}}>
          {title}
        </div>
        <Input
          style={{height: "35px"}}
          value={value}
          placeholder="Basic usage"
        />
      </div>
    );
  }

  const handleSendMoney = () => {
    console.log("send money");
    sendMoney(bookingId)
    .then((res) => {
      console.log(res);
      notification.success({
        message: "Chuyển tiền thành công"
      })
    })
    .catch((err) => {
      console.log(err);
      notification.success({
        message: "Chuyển tiền không thành công"
      })
    })
  }

  return (
    <div>
      <h3>Thông tin khách hàng</h3>
      <div style={{marginTop: 10}}>
        <div style={{paddingLeft: "27%", marginBottom: 5}}>
          <Image
            preview={false}
            style={{borderRadius: "50%", objectFit: "cover"}}
            width={100}
            height={100}
            src={
              dataDetailBookingInit?.data?.renterAvatar ??
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
          />
        </div>
        <ItemInput
          title="Tên"
          value={dataDetailBookingInit?.data?.renterName}
        />
        <ItemInput
          title="Địa chỉ"
          value={dataDetailBookingInit?.data?.locationDescription}
        />
        {/* <ItemInput title="Điện thoại" value="" /> */}
      </div>
      <h3>Chi tiết bài đăng</h3>
      <div style={{maxHeight: 280, overflowY: "scroll"}}>
        {dataDetailBookingInit?.data?.details &&
          dataDetailBookingInit.data.details.map((item, index) => (
            <div key={index} style={{marginTop: 10}}>
              <i style={{marginTop: 5, marginBottom: 5}}>Dịch vụ {index + 1}</i>
              <div style={{marginLeft: 20}}>
                <ItemInput title="Dịch vụ" value={item.serviceName} />
                <ItemInput title="Dung lượng" value={item.value} />
                <ItemInput
                  title="Ngày đăng"
                  value={formatDateTime(item.orderDate)}
                />
                <ItemInput
                  title="Giá đơn hàng"
                  value={formatMoney(item.price)}
                />
                <ItemInput title="Ngày thực hiện" value={item.workDate} />
                <div style={{display: "flex"}}>
                  <div
                    style={{width: "30%", color: "#495057", fontWeight: "500"}}
                  >
                    Trạng thái
                  </div>
                  {item.status === "NOT_YET" && (
                    <Tag color="cyan">{item.status}</Tag>
                  )}
                  {item.status === "ON_CART" && (
                    <Tag color="volcano">{item.status}</Tag>
                  )}
                  {item.status === "REJECTED" && (
                    <Tag color="orange">{item.status}</Tag>
                  )}
                  {item.status === "APPROVED" && (
                    <Tag color="green">{item.status}</Tag>
                  )}
                  {item.status === "FINISHED" && (
                    <Tag color="red">{item.status}</Tag>
                  )}
                  {item.status === "NO_MONEY" && (
                    <Tag color="purple">{item.status}</Tag>
                  )}
                  {item.status === "CANCELED" && (
                    <Tag color="red">{item.status}</Tag>
                  )}
                  {/* <Tag color="volcano">{item.status}</Tag> */}
                </div>
              </div>
            </div>
          ))}
      </div>
      {dataDetailBookingInit?.data?.currentStatus === "NOT_YET" && (
        <div
          style={{marginTop: 30, display: "flex", justifyContent: "flex-end"}}
        >
          <Button
            type="primary"
            danger
            onClick={showModalDeleteBooking}
            style={{borderRadius: "25px", marginRight: 10}}
          >
            Từ chối
          </Button>
          <Button
            onClick={handleAcceptBooking}
            type="primary"
            style={{borderRadius: "25px"}}
            >
            Phê duyệt
          </Button>
        </div>
      )}
      {dataDetailBookingInit?.data?.currentStatus === "FINISHED" && (
        <div
          style={{marginTop: 30, display: "flex", justifyContent: "flex-end"}}
        >
          <Button
            onClick={handleSendMoney}
            type="primary"
            style={{borderRadius: "25px"}}
          >
            Chuyển tiền
          </Button>
        </div>
      )}
      <ModalDeleteBooking
        bookingId={bookingId}
        isModalDeleteBooking={isModalDeleteBooking}
        handleCancel={handleCancelDelete}
        handleCancelModalViewDetail={handleCancel}
        refetchListBooking={refetchListBooking}
      />
    </div>
  );
}
