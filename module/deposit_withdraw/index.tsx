import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {useQuery} from "react-query";
import {useSelector} from "react-redux";

import {DownloadOutlined, UploadOutlined} from "@ant-design/icons";
import ApiUser, {IGetListUser} from "@app/api/ApiUser";
import FilterGroupGlobal, {
  ListSelectOptionType,
} from "@app/components/FilterGroupGlobal";
import {IRootState} from "@app/redux/store";
import {
  IGetTransactionHistory,
  IMoneyRequest,
  IMoneyRequestValidated,
  IParamsGetAllTransactionHistory,
  moneyRequest,
  moneyRequestValidated,
  transactionHistory,
} from "../../api/ApiMoney";
import {formatDateTime} from "../../utils/formatTime";
import {formatMoney} from "@app/utils/formatMoney";

interface DataType {
  key: string;
  userId: number;
  name: string;
  avatar: string;
  address: string;
  roleName: string;
  description: string;
  transport: string;
  phoneNumber: string;
  isLocked: boolean;
}

interface TransactionHistory {
  requestId: number;
  requestDate: string;
  balance: number;
  requestStatus: string;
  processDate: null;
  requestType: string;
}

export function DepositWithdraw(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUserInit, setDataUserInit] = useState<any>([]);
  const [paramFilter, setParamFilter] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [sentOtp, setSentOtp] = useState<boolean>(false);
  const [typeDW, setTypeDW] = useState<string>("");
  const [titlePopupDW, setTitlePopupDW] = useState<string>("");
  const [form] = Form.useForm();
  const [isModalHistoryOpen, setIsModalHistoryOpen] = useState<boolean>(false);
  const [dataTransactionHistory, setDataTransactionHistory] = useState<any>([]);
  const [selectedUserPhone, setSelectedUserPhone] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const displayedData = dataUserInit.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const user = useSelector((state: IRootState) => state.user);
  console.log(user);
  const getDataListUser = (): Promise<IGetListUser> =>
    ApiUser.getAllUser({
      page: 1,
      size: 10,
      role: paramFilter,
    });

  const {refetch} = useQuery(["GET_DATE_LIST_USER"], getDataListUser, {
    onSuccess: (res) => {
      const filteredUsers = res?.data?.content?.filter(
        (user: any) => user.roleName !== "admin" && user.roleName !== "manager"
      );
      setDataUserInit(filteredUsers ?? []);
    },
  });

  const handleSubmit = async (formData: any) => {
    // const selectedUser = dataUserInit.find(
    //   (user: {userId: number | undefined}) => user.userId === selectedUserId
    // );
    console.log(selectedUserPhone);
    if (sentOtp) {
      try {
        const data: IMoneyRequestValidated = {
          phoneNumber: selectedUserPhone,
          otpToken: formData.otp,
        };
        console.log(data);
        const res = moneyRequestValidated(data);
        console.log("Yêu cầu thành công >> ", (await res).status);
        closeModal();
        notification.success({
          message: "Yêu cầu thành công",
          description: "Yêu cầu của bạn đã được xử lý thành công.",
        });
        setSentOtp(false);
      } catch (err) {
        notification.error({
          message: "Lỗi",
          description: "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.",
        });
      }
    } else {
      const data: IMoneyRequest = {
        userPhoneNumber: selectedUserPhone,
        balance: formData.balance,
        moneyRequestType: typeDW,
      };
      console.log(data);
      try {
        moneyRequest(data);
        console.log("Sent otp");
      } catch (err) {
        console.log("Erorr");
      }

      setSentOtp(true);
    }
  };

  useEffect(() => {
    refetch();
  }, [paramFilter]);

  const listSelectOption: ListSelectOptionType[] = [
    {
      title: "Lọc",
      handleChange: (value: string): void => {
        setParamFilter(value === "all" ? "" : value);
      },
      placeholder: "Lọc theo quyền",
      defaultValue: "all",
      optionSelect: [
        {
          value: "all",
          label: "Tất cả",
        },
        {
          value: "Employee",
          label: "Nhân viên",
        },
        {
          value: "Renter",
          label: "Khách hàng",
        },
      ],
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 60,
      render: (_, dataIndex) => (
        <div>{dataUserInit.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "image",
      render: (_, dataIndex) => (
        <div>
          <Image
            style={{borderRadius: 55}}
            width={55}
            height={55}
            preview={false}
            src={
              dataIndex.avatar ??
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
          />
        </div>
      ),
      align: "center",
      width: 100,
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      align: "center",
    },
    {
      title: "SDT",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 120,
    },
    {
      title: "Quyền",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
      width: 100,
      fixed: "right",
      render: (_, dataIndex) => (
        <div>
          {dataIndex.roleName === "employee" ? "Nhân viên" : "Khách hàng"}
        </div>
      ),
    },
    {
      title: "Lịch sử giao dịch",
      key: "history",
      dataIndex: "history",
      fixed: "right",
      align: "center",
      render: (_, dataIndex) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="link"
              onClick={() => showHistory(dataIndex.phoneNumber)}
            >
              Lịch sử giao dịch
            </Button>
          </div>
        );
      },
      width: 100,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      render: (_, dataIndex) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Rút tiền">
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onClick={() => handleWithdraw(dataIndex.phoneNumber)}>
                <DownloadOutlined
                  style={{
                    fontSize: 22,
                  }}
                />
              </div>
            </Tooltip>
            <div style={{width: "10px"}} />
            <Tooltip title="Nạp tiền">
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onClick={() => handleDeposit(dataIndex.phoneNumber)}>
                <UploadOutlined
                  style={{
                    fontSize: 22,
                    transform: "rotate(90deg)",
                  }}
                />
              </div>
            </Tooltip>
          </div>
        );
      },
      width: 100,
    },
  ];

  const showHistory = (phoneNumber: string) => {
    console.log("Show history of user:", phoneNumber);

    const params: IParamsGetAllTransactionHistory = {
      page: 1,
      size: 10,
      phoneNumber: phoneNumber,
    };

    transactionHistory(params)
      .then((response: IGetTransactionHistory) => {
        // Handle the response data here
        console.log("Transaction history:", response.data?.data?.content);
        setDataTransactionHistory(response.data?.data?.content);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching transaction history:", error);
      });
    openModalHistory();
  };

  const handleWithdraw = (phone: string) => {
    setSelectedUserPhone(phone);
    setTypeDW("withdraw");
    setTitlePopupDW("Rút tiền");
    openModal();
  };

  const handleDeposit = (phone: string) => {
    setSelectedUserPhone(phone);
    setTypeDW("deposit");
    setTitlePopupDW("Nạp tiền");
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSentOtp(false);
    form.resetFields();
  };

  const openModalHistory = () => {
    setIsModalHistoryOpen(true);
  };

  const closeHistoryModal = () => {
    setIsModalHistoryOpen(false);
  };

  const columnsInHistory: ColumnsType<TransactionHistory> = [
    {
      title: "Id",
      dataIndex: "requestId",
      key: "requestId",
    },
    {
      title: "Ngày",
      dataIndex: "requestDate",
      key: "date",
      render: (_, dataIndex) => {
        return <span>{formatDateTime(dataIndex.requestDate)}</span>;
      },
    },
    {
      title: "Số tiền",
      dataIndex: "balance",
      key: "balance",
      render: (_, dataIndex) => <span>{formatMoney(dataIndex.balance)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (_, dataIndex) => {
        var color = "warning";
        switch (dataIndex.requestStatus) {
          case "SUCCESS":
            color = "success";
            break;
          case "CANCEL":
            color = "warning";
            break;
          case "PENDING":
            color = "processing";
            break;
          default:
            break;
        }

        return <Tag color={color}>{dataIndex.requestStatus}</Tag>;
      },
    },
    {
      title: "Loại",
      dataIndex: "requestType",
      key: "requestType",
      render: (_, dataIndex) => {
        var type;
        if (dataIndex.requestType === "WITHDRAW") {
          type = "Rút tiền";
        }
        if (dataIndex.requestType === "DEPOSIT") {
          type = "Nạp tiền";
        }
        return <span>{type}</span>;
      },
    },
  ];

  return (
    <div className="deposit-withdraw-container">
      <FilterGroupGlobal listSelectOption={listSelectOption} />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 800, y: 500}}
        columns={columns}
        dataSource={displayedData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: dataUserInit.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      <Modal
        title="Yêu cầu"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="border_radius"
      >
        <Form
          name="deposit-withdraw"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          action="POST"
        >
          <Form.Item label={titlePopupDW} name="balance">
            <Input placeholder="Nhập số tiền" />
          </Form.Item>

          <Form.Item label="OTP" name="otp">
            <Input placeholder="Nhập OTP" disabled={!sentOtp} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#52C41A",
                borderColor: "#52C41A",
                marginRight: "10px",
              }}
            >
              {sentOtp ? "Xác nhận" : "Gửi"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        className="border_radius"
        title="Lịch sử giao dịch"
        open={isModalHistoryOpen}
        onCancel={closeHistoryModal}
        footer={null}
      >
        <Table
          style={{marginTop: 10}}
          columns={columnsInHistory}
          dataSource={dataTransactionHistory}
          pagination={false}
        />
      </Modal>
    </div>
  );
}
