import React, {useEffect, useState} from "react";
import {Button, Image, Table, Tabs, TabsProps, Tag, notification} from "antd";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {
  getAllApply,
  IGetAllApplyRes,
  IItemApplyRes,
  setApplyForManager,
} from "@app/api/ApiProduct";
import {useQuery} from "react-query";
import {LoadingGlobal} from "@app/components/Loading";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";

export function ListApply(): JSX.Element {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);
  const [dataApply, setDataApply] = useState<IItemApplyRes[]>([]);
  const [keyTabSelected, setKeyTabSelected] = useState<string>(
    user.userInformationDto?.roleName === "admin" ? "WAITING_FOR_APPROVE" : ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const displayedData = dataApply.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getDataListApply = (): Promise<IGetAllApplyRes> =>
    // IGetAllBookingRes
    getAllApply({
      page: 1,
      size: 10,
      statuses: keyTabSelected,
    });

  const dataListApply = useQuery(["GET_LIST_APPLY"], getDataListApply, {
    onSuccess: (res) => {
      console.log("res", res?.data?.content);
      setDataApply(res?.data?.content ?? []);
    },
  });

  const goToDetailApply = (idValue: number): void => {
    router.push({
      pathname: "/detail_apply",
      query: {
        id: idValue,
      },
    });
  };

  const handleSearch = (valueSearch: string): void => {
    console.log(valueSearch);
  };

  const onChangeTab = (key: string) => {
    setKeyTabSelected(key === "all" ? "" : key);
  };

  useEffect(() => {
    dataListApply.refetch();
  }, [keyTabSelected]);

  const itemsTab: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả",
    },
    {
      key: "WAITING_FOR_APPROVE",
      label: "Chờ duyệt",
    },
    {
      key: "WAITING_FOR_CONFIRM",
      label: "Chờ xác nhận",
    },
  ];

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
      tooltip: "Ngày tạo",
      title: "Ngày tạo",
      onChange: (startTime: number, endTime: number): void => {
        console.log(startTime);
      },
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
        <div>{dataApply.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "personalAvatar",
      key: "image",
      render: (_: any, dataIndex: any) => (
        <div>
          <Image
            style={{borderRadius: 55}}
            width={55}
            height={55}
            preview={false}
            src={
              dataIndex.personalAvatar ??
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
          />
        </div>
      ),
      align: "center",
      width: 140,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      width: 170,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "center",
      width: 220,
    },
    {
      title: "Tạm trú",
      dataIndex: "placeOfResidence",
      key: "placeOfResidence",
      align: "center",
      width: 250,
    },
    {
      title: "Quê quán",
      dataIndex: "homeTown",
      key: "homeTown",
      align: "center",
      width: 200,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      fixed: "right",
      width: 120,
      render: (_: any, dataIndex: any) => (
        <div>
          {dataIndex.status === "WAITING_FOR_APPROVE" && (
            <Tag color="cyan">{"Chờ duyệt"}</Tag>
          )}
          {dataIndex.status === "WAITING_FOR_CONFIRM" && (
            <Tag color="lime">{"Chờ xác nhận"}</Tag>
          )}
          {dataIndex.status === "DISABLED" && (
            <Tag color="red">{"Từ chối"}</Tag>
          )}
          {dataIndex.status === "ONLINE" && (
            <Tag color="green">{"Hoạt động"}</Tag>
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
          {/* <div>{dataIndex.helperInformationId}</div> */}
          <Button
            onClick={() => goToDetailApply(dataIndex.helperInformationId)}
            style={{fontSize: 13}}
            shape="round"
            type="primary"
          >
            Xem chi tiết
          </Button>
        </div>
      ),
      fixed: "right",
      width: 140,
    },
  ];

  const chiaDon = () => {
    setApplyForManager()
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Thành công",
          description: "Chia đơn cho quản lý thành công",
          duration: 3,
        });
      })
      .catch(() => {
        notification.warning({
          message: "Không thành công",
          description: "Không còn đơn chưa chia",
          duration: 3,
        });
      });
  };
  return (
    <div className="list-apply-container">
      {user.userInformationDto?.roleName === "admin" ? (
        <></>
      ) : (
        <Tabs defaultActiveKey="all" items={itemsTab} onChange={onChangeTab} />
      )}
      <div style={{display: "flex", justifyContent: "space-between"}}>
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
      {dataListApply.isLoading ? (
        <LoadingGlobal />
      ) : (
        <Table
          style={{marginTop: 10}}
          scroll={{x: 600, y: 500}}
          columns={columns}
          dataSource={displayedData}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: dataApply.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      )}
    </div>
  );
}
