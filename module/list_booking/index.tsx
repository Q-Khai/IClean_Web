import React, {useEffect, useState} from "react";
import {
  Button,
  Image,
  Modal,
  notification,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {
  getAllBooking,
  IListItemBooking,
  setBookingForManager,
} from "@app/api/ApiProduct";
import {useQuery} from "react-query";
import {ModalViewDetailBooking} from "@app/module/list_booking/components/ModalViewDetailBooking";
import "./index.scss";
import {itemsTab} from "@app/module/list_booking/listDataDefault";
import {ModalDeleteBooking} from "@app/module/list_booking/components/ModalDeleteBooking";
import {formatDateTime} from "@app/utils/formatTime";
import {formatMoney} from "@app/utils/formatMoney";
import {useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";

export function ListBooking(): JSX.Element {
  const user = useSelector((state: IRootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteBooking, setIsModalDeleteBooking] = useState(false);
  const [dataBooking, setDataBooking] = useState<IListItemBooking[]>([]);
  const [bookingIdSelected, setBookingIdSelected] = useState<
    number | undefined
  >(undefined);
  const [keyTabSelected, setKeyTabSelected] = useState<string>(
    user.userInformationDto?.roleName === "admin" ? "NOT_YET" : ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const displayedData = dataBooking.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // action reject - post
  const getDataListBooking = (): Promise<any> =>
    // IGetAllBookingRes
    getAllBooking({
      page: 1,
      size: 10,
      statuses: keyTabSelected,
    });

  const dataListBooking = useQuery(["GET_LIST_ICON"], getDataListBooking, {
    onSuccess: (res) => {
      console.log("res1111", res?.data?.content);

      setDataBooking(res.data.content);
    },
  });

  const showModal = (id: number) => {
    setIsModalOpen(true);
    setBookingIdSelected(id);
  };

  // const handleAcceptBooking = (id?: number) => {
  //   if (id) {
  //     rejectBookingMutate.mutate(
  //       {
  //         id: id,
  //         action: "approved",
  //       },
  //       {
  //         onSuccess: () => {
  //           notification.success({
  //             message: "Phê duyệt thành công!",
  //           });
  //           dataListBooking.refetch();
  //         },
  //       }
  //     );
  //   }
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalDeleteBooking(false);
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
  };

  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };

  const onChangeTab = (key: string) => {
    setKeyTabSelected(key === "all" ? "" : key);
  };

  useEffect(() => {
    dataListBooking.refetch();
  }, [keyTabSelected]);

  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Tìm kiếm",
    },
  ];
  const listDatePicker = [
    {
      onChange: (startTime: number, endTime: number): void => {
        console.log("startTime", startTime);
        console.log("endTime", endTime);
      },
      tooltip: "Ngày tạo",
      title: "Ngày tạo",
    },
  ];
  const columns: any = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 70,
      render: (_: any, dataIndex: any) => (
        <div>{dataBooking.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "bookingCode",
      key: "bookingCode",
      width: 150,
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "renterAvatar",
      key: "image",
      render: (_: any, dataIndex: any) => (
        <div>
          <Image
            style={{borderRadius: 55}}
            width={55}
            height={55}
            preview={false}
            src={
              dataIndex.renterAvatar ??
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
          />
        </div>
      ),
      align: "center",
      width: 100,
    },
    {
      title: "Người thuê",
      key: "renterName",
      dataIndex: "renterName",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 140,
    },
    {
      title: "SĐT người thuê",
      dataIndex: "renterPhoneNumber",
      key: "renterPhoneNumber",
      align: "center",
      width: 140,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      align: "center",
      width: 140,
      render: (_: any, dataIndex: any) => {
        return <span>{formatDateTime(dataIndex.orderDate)}</span>;
      },
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      width: 140,
      render: (_: any, dataIndex: any) => (
        <span>{formatMoney(dataIndex.totalPrice)}</span>
      ),
    },
    {
      title: "Giá thực tế",
      dataIndex: "totalPriceActual",
      key: "totalPriceActual",
      align: "center",
      width: 140,
      render: (_: any, dataIndex: any) => (
        <span>{formatMoney(dataIndex.totalPriceActual)}</span>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      align: "center",
      fixed: "right",
      width: 170,
      render: (_: any, dataIndex: any) => (
        <div>
          {dataIndex.bookingStatus === "NOT_YET" && (
            <Tag color="cyan">Chưa duyệt</Tag>
          )}
          {dataIndex.bookingStatus === "ON_CART" && (
            <Tag color="volcano">Đang chờ</Tag>
          )}
          {dataIndex.bookingStatus === "REJECTED" && (
            <Tag color="orange">Từ chối</Tag>
          )}
          {dataIndex.bookingStatus === "APPROVED" && (
            <Tag color="green">Đã duyệt</Tag>
          )}
          {dataIndex.bookingStatus === "FINISHED" && (
            <Tag color="red">Hoàn thành</Tag>
          )}
          {dataIndex.bookingStatus === "NO_MONEY" && (
            <Tag color="purple">{dataIndex.bookingStatus}</Tag>
          )}
          {dataIndex.bookingStatus === "CANCELED" && (
            <Tag color="red">Đã huỷ</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_: any, dataIndex: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button type="primary" shape="round"> */}
          {/*  Xem chi tiết */}
          {/* </Button> */}
          <Tooltip placement="top" title="Xem chi tiết">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <Button
              type="primary"
              style={{borderRadius: "25px"}}
              onClick={() => showModal(dataIndex.bookingId)}
            >
              Xem chi tiết
            </Button>
            {/* <div
              onClick={() => showModal(dataIndex.bookingId)}
              style={{marginLeft: 8}}
            >
              <EyeOutlined style={{fontSize: 27, color: "blue"}} />
            </div> */}
          </Tooltip>

          {/* {dataIndex.bookingStatus === "NOT_YET" && (
            <>
              <Tooltip placement="top" title="Phê duyệt">
                <div
                  onClick={() => handleAcceptBooking(dataIndex.bookingId)}
                  style={{marginLeft: 8}}
                >
                  <CheckCircleOutlined style={{fontSize: 22, color: "green"}} />
                </div>
              </Tooltip>

              <Tooltip placement="top" title="Từ chối">
                <div
                  onClick={() => showModalDeleteBooking(dataIndex.bookingId)}
                  style={{marginLeft: 8}}
                >
                  <CloseCircleOutlined
                    style={{fontSize: 22, color: "orange"}}
                  />
                </div>
              </Tooltip>
            </>
          )} */}
        </div>
      ),
      fixed: "right",
      width: 140,
    },
  ];

  const chiaDon = () => {
    setBookingForManager()
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Thành công",
          description: "Chia đơn cho quản lý thành công",
          duration: 3,
        });
      })
      .catch((err) => {
        console.log(err);
        notification.warning({
          message: "Không thành công",
          description: "Không còn đơn chưa chia",
          duration: 3,
        });
      });
  };

  return (
    <div className="list-booking-container">
      {user.userInformationDto?.roleName === "admin" ? (
        <></>
      ) : (
        <Tabs defaultActiveKey="all" items={itemsTab} onChange={onChangeTab} />
      )}
      <div className="filter">
        <FilterGroupGlobal
          listSearchText={listSearchText}
          listDatePicker={listDatePicker}
        />
        {user.userInformationDto?.roleName === "admin" ? (
          <Button
            type="primary"
            onClick={chiaDon}
            style={{borderRadius: "25px"}}
          >
            Chia đơn cho quản lý
          </Button>
        ) : (
          <div></div>
        )}
      </div>
      <Table
        style={{marginTop: 10}}
        scroll={{x: 600, y: 505}}
        columns={columns}
        dataSource={displayedData}
        className="table-list-booking"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: dataBooking.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      <Modal
        className="border_radius"
        title="Chi tiết đơn hàng"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={false}
      >
        <ModalViewDetailBooking
          bookingId={bookingIdSelected}
          handleCancel={handleCancel}
          refetchListBooking={dataListBooking.refetch}
        />
      </Modal>

      <ModalDeleteBooking
        bookingId={bookingIdSelected}
        isModalDeleteBooking={isModalDeleteBooking}
        handleCancel={handleCancel}
      />
    </div>
  );
}
