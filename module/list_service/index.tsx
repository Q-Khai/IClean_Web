import React, {useState} from "react";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {Button, Image, Table, Tag} from "antd";
import {EditOutlined} from "@ant-design/icons";

import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {ColumnsType} from "antd/es/table";
import {getAllService, IGetListServiceRes} from "@app/api/ApiService";
import {formatDateTime} from "@app/utils/formatTime";
import {PopupAddService} from "./components/PopupAddService";

interface DataType {
  serviceId: number;
  serviceImage: string;
  serviceName: string;
  isDeleted: string;
  createAt: string;
}

export function ListService(): JSX.Element {
  const [dataInit, setDataInit] = useState<any>([]);
  const getDataListService = (): Promise<IGetListServiceRes> => getAllService();
  const [isOpenPopupAddService, setIsOpenPopupAddService] =
    useState<boolean>(false);
  const router = useRouter();

  const {data} = useQuery(["GET_LIST_SERVICE"], getDataListService, {
    onSuccess: (res) => {
      console.log("res1111", res?.data);
      setDataInit(res?.data ?? []);
    },
  });
  console.log(data);
  console.log("dataInit", dataInit);
  const handleSearch = (valueSearch: string): void => {
    console.log(valueSearch);
  };
  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khóa: Dịch vụ",
    },
  ];

  const viewService = (serviceId: number) => {
    router.push({
      pathname: "/detail_service",
      query: {
        id: serviceId,
      },
    });
  };

  const listDatePicker = [
    {
      onChange: (startTime: number, endTime: number): void => {
        console.log("sss");
      },
      tooltip: "Ngày tạo",
      title: "Ngày tạo",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 50,
      render: (_, dataIndex: any) => (
        <div>{dataInit.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Ảnh dịch vụ",
      dataIndex: "avatar",
      key: "image",
      render: (_, dataIndex) => (
        <div>
          <Image
            style={{borderRadius: 100}}
            width={80}
            height={80}
            preview={false}
            src={dataIndex.serviceImage}
          />
        </div>
      ),
      align: "center",
      width: 70,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      width: 100,
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      align: "center",
      width: 100,
      render: (_: any, dataIndex: any) => {
        return <span>{formatDateTime(dataIndex.createAt)}</span>;
      },
    },
    {
      title: "Trạng thái",
      key: "isDeleted",
      dataIndex: "isDeleted",
      align: "center",
      render: (_, dataIndex) => (
        <div>
          {!dataIndex.isDeleted ? (
            <Tag color="green">Đang hoạt động</Tag>
          ) : (
            <Tag color="red">Không hoạt động</Tag>
          )}
        </div>
      ),
      width: 50,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_, dataIndex) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{marginLeft: 8}}
            onClick={() => viewService(dataIndex.serviceId)}
          >
            <EditOutlined style={{fontSize: 22, color: "blue"}} />
          </div>
        </div>
      ),
      fixed: "right",
      width: 100,
    },
  ];

  const closeModal = () => {
    setIsOpenPopupAddService(false);
  };

  return (
    <div className="manager-user-container">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <FilterGroupGlobal
          listSearchText={listSearchText}
          listDatePicker={listDatePicker}
        />
        <Button type="primary" onClick={() => setIsOpenPopupAddService(true)}>
          Thêm dịch vụ
        </Button>
      </div>
      <Table
        style={{marginTop: 10}}
        scroll={{x: 1000, y: 550}}
        columns={columns}
        dataSource={dataInit}
        pagination={false}
      />
      <PopupAddService
        open={isOpenPopupAddService}
        close={closeModal}
      ></PopupAddService>
    </div>
  );
}
