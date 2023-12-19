import React, {useEffect, useRef, useState} from "react";
import Chart from "chart.js/auto";
import {Button, Card, Col, DatePicker, Row, Table} from "antd";
import {
  BarChartOutlined,
  DollarOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./index.scss";
import {useRouter} from "next/router";
import {
  IParamCountBooking,
  getCountBooking,
  getDashboardHome,
} from "@app/api/ApiDashboard";
import {formatMoney} from "@app/utils/formatMoney";

type ChartTypeRegistry = {
  bar: Chart;
  line: Chart;
  pie: Chart;
};

type ChartType = keyof ChartTypeRegistry;

export function Dashboard(): JSX.Element {
  const canvasEl = useRef<any>();
  const [chartLabels, setChartLabels] = useState<any>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ]);
  const router = useRouter();
  const [dataInit, setDataInit] = useState<any>();
  const [dataChart, setDataChart] = useState<any>();
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const chartType: ChartType = "bar";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardHome();
        setDataInit(data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    console.log("Data init >> ", dataInit);
  }, []);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(90, 217, 255, 1)",
      half: "rgba(90, 217, 255, 0.5)",
      quarter: "rgba(90, 217, 255, 0.25)",
      zero: "rgba(90, 217, 255, 0)",
    },
  };

  let bookingCounter = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ];

  let bookingSalesInMonth = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ];

  useEffect(() => {
    const param: IParamCountBooking = {
      month: month,
      year: year,
    };

    console.log("Param >> ", param);
    getCountBooking(param)
      .then((res) => {
        setDataChart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Data just fetch >> ", dataChart);
  }, [year, month]);

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    const gradient1 = ctx.createLinearGradient(0, 16, 0, 600);
    const gradient2 = ctx.createLinearGradient(0, 16, 0, 600);
    gradient1.addColorStop(0, colors.purple.half);
    gradient1.addColorStop(0.65, colors.purple.quarter);
    gradient1.addColorStop(1, colors.purple.zero);
    gradient2.addColorStop(0, colors.indigo.half);
    gradient2.addColorStop(0.65, colors.indigo.quarter);
    gradient2.addColorStop(1, colors.indigo.zero);

    dataChart?.map(
      (item: {
        dayOfMonth: string | number | Date;
        bookingCounter: number;
        bookingSalesInMonth: number;
      }) => {
        const date = new Date(item.dayOfMonth);
        const dateNum: number = date.getDate();
        bookingCounter.forEach((item1, i) => {
          if (i === dateNum) {
            bookingCounter[i - 1] = item.bookingCounter;
          }
        });
        bookingSalesInMonth.forEach((item1, i) => {
          if (i === dateNum) {
            bookingSalesInMonth[i - 1] = item.bookingSalesInMonth / 1000000;
          }
        });
      }
    );

    console.log("Data in chart >>", bookingSalesInMonth);

    const data = {
      labels: chartLabels,
      datasets: [
        {
          backgroundColor: gradient1,
          label: "Tổng đơn trên ngày",
          data: bookingCounter,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
        {
          backgroundColor: gradient2,
          label: "Doanh thu ngày: Triệu vnđ",
          data: bookingSalesInMonth,
          fill: true,
          borderWidth: 2,
          borderColor: colors.indigo.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.indigo.default,
          pointRadius: 3,
        },
      ],
    };

    const config = {
      type: chartType,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  }, [dataChart]);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "helperInformationId",
      key: "helperInformationId",
    },
    {
      title: "Số đơn",
      dataIndex: "counter",
      key: "counter",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (_: any, dataIndex: any) => (
        <Button
          type="primary"
          style={{borderRadius: "25px"}}
          onClick={() => handleViewMore(dataIndex.helperInformationId)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleViewMore = (helperId: string) => {
    console.log(helperId);
    router.push("./manager_user");
  };

  const handleDateChange = (dates: any, dateStrings: any) => {
    if (dates) {
      console.log("Month selected:", dates._d.getMonth() + 1);
      console.log("Year selected:", dates._d.getFullYear());
      setMonth(dates._d.getMonth() + 1);
      setYear(dates._d.getFullYear());
    }
  };

  return (
    <div className="transaction-statistics-container">
      <Row gutter={[32, 24]}>
        <Col span={6}>
          <Card className="border_radius">
            <div className="card_container">
              <div className="icon_container">
                <TeamOutlined className="icon" size={32} />
              </div>
              <div className="figure_container">
                <span className="figure_title">Tổng người dùng</span>
                <span className="figure_content">
                  {dataInit?.sumOfAllUserWithoutAdmin}
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="border_radius">
            <div className="card_container">
              <div className="icon_container">
                <SnippetsOutlined className="icon" size={32} />
              </div>
              <div className="figure_container">
                <span className="figure_title">Tổng đơn hàng</span>
                <span className="figure_content">
                  {dataInit?.sumOfAllBooking}
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="border_radius">
            <div className="card_container">
              <div className="icon_container">
                <DollarOutlined className="icon" size={32} />
              </div>
              <div className="figure_container">
                <span className="figure_title">Tổng doanh thu</span>
                <span className="figure_content">
                  {formatMoney(dataInit?.getSumOfIncome)}
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="border_radius">
            <div className="card_container">
              <div className="icon_container">
                <BarChartOutlined className="icon" size={32} />
              </div>
              <div className="figure_container">
                <span className="figure_title">Người dùng mới</span>
                <span className="figure_content">
                  {dataInit?.sumOfNewUserInCurrentWeek}
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Card
        title="Biểu đồ"
        className="mt_32 border_radius"
        extra={
          <>
            <DatePicker onChange={handleDateChange} picker="month" />
          </>
        }
      >
        <canvas id="myChart" ref={canvasEl} height={50} />
      </Card>

      <Card title={"Nhân viên chăm chỉ"} className="mt_32 mb_32 border_radius">
        <Table columns={columns} dataSource={dataInit?.topEmployees}></Table>
      </Card>
    </div>
  );
}
