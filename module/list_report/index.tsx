import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Pagination, Table, Tabs, TabsProps, Tag} from "antd";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {useQuery} from "react-query";
import {
  getAllReport,
  IGetListReportRes,
  IParamGetAllReport,
} from "@app/api/ApiReport";
import {LoadingGlobal} from "@app/components/Loading";
import {formatDateTime} from "@app/utils/formatTime";
import {useRouter} from "next/router";
import moment from "moment";

interface DataType {
  key: string;
  reportId: number;
  fullName: string;
  phoneNumber: string;
  reportTypeDetail: string;
  detail: string;
  createAt: string;
  reportStatus: string;
}

export function ListReport(): JSX.Element {
  const [dataInit, setDataInit] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("all");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [dateRange, setDateRange] = useState<any>([]);
  const [paramsGetReport, setParamsGetReport] = useState<IParamGetAllReport>({
    renterName: "",
    page: 1,
    size: 10,
  });
  const router = useRouter();

  const onChangePagination = (value: any): void => {
    console.log(value);
  };

  const getDataDetailReport = (): Promise<IGetListReportRes> =>
    getAllReport({
      renterName: paramsGetReport.renterName,
      displayAll: true,
      page: paramsGetReport.page,
      size: paramsGetReport.size,
    });

    useEffect(() => {
      const filteredData = dataInit.filter((item: { reportStatus: string; }) => {
        if (currentTab === "all") {
          return true;
        } else {
          return item.reportStatus === currentTab;
        }
      });
      setFilteredData(filteredData)
    }, [dataInit, currentTab]);

  const {refetch, data, isLoading} = useQuery(
    ["GET_DETAIL_REPORT"],
    getDataDetailReport,
    {
      onSuccess: (res) => {
        console.log(res?.data?.content);
        setDataInit(res?.data?.content);
      },
    }
  );

  console.log("dataInit", dataInit);

  const handleSearch = (valueSearch: string): void => {
    console.log(valueSearch);
    setParamsGetReport({...paramsGetReport, renterName: valueSearch});
  };

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
        console.log(startTime, endTime);
        setDateRange([startTime, endTime])
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
      render: (_, dataIndex) => <div>{dataInit.indexOf(dataIndex) + 1}</div>,
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
      key: "fullName",
      width: 100,
      align: "center",
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
      width: 80,
    },
    {
      title: "Loại báo cáo",
      dataIndex: "reportTypeDetail",
      key: "reportTypeDetail",
      align: "center",
      width: 150,
    },
    // {
    //   title: "Chi tiết",
    //   dataIndex: "detail",
    //   key: "detail",
    //   align: "center",
    //   width: 170,
    // },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      align: "center",
      width: 120,
      render: (_, dataIndex) => (
        <span>{formatDateTime(dataIndex.createAt)}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "reportStatus",
      key: "reportStatus",
      align: "center",
      width: 80,
      render: (_: any, dataIndex: any) => (
        <div>
          {dataIndex.reportStatus === "PROCESSING" && (
            <Tag color="cyan">{"Chờ duyệt"}</Tag>
          )}
          {dataIndex.reportStatus === "PROCESSED" && (
            <Tag color="lime">{"Đã xử lý"}</Tag>
          )}
          {dataIndex.reportStatus === "REJECTED" && (
            <Tag color="red">{"Từ chối"}</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Chi tiết",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_, dataIndex) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <Button
          onClick={() => goToDetailReport(dataIndex.reportId)}
          type="primary"
          style={{
            borderRadius: "16px",
          }}
        >
          Xem
        </Button>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  useEffect(() => {
    refetch();
  }, [paramsGetReport]);

  const goToDetailReport = (idValue: number): void => {
    router.push({
      pathname: "/detail_report",
      query: {
        id: idValue,
      },
    });
  };

  const itemsTab: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả",
    },
    {
      key: "PROCESSING",
      label: "Chờ duyệt",
    },
    {
      key: "PROCESSED",
      label: "Đã xử lý",
    },
    {
      key: "REJECTED",
      label: "Từ chối",
    },
  ];

  const onChangeTab = (key : string) => {
    setCurrentTab(key);
  }

  return (
    <div className="manager-user-container">
      <Tabs defaultActiveKey="all" items={itemsTab} onChange={onChangeTab} />
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      {isLoading ? (
        <LoadingGlobal />
      ) : (
        <Table
          style={{marginTop: 10}}
          scroll={{x: 600, y: 550}}
          columns={columns}
          dataSource={filteredData}
          pagination={false}
        />
      )}

      <div
        className="pagination-table"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "17px",
        }}
      >
        <Pagination
          onChange={onChangePagination}
          defaultCurrent={1}
          total={data?.data?.totalElements}
        />
      </div>
    </div>
  );
}
