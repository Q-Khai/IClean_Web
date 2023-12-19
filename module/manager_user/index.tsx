import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Modal, notification, Table, Tag, Tooltip} from "antd";
import {StopOutlined, SyncOutlined} from "@ant-design/icons";

import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {Formik} from "formik";
import UploadFileGlobal from "@app/components/UploadFileGlobal";
import {useMutation, useQuery} from "react-query";
import ApiUser, {IGetListUser} from "@app/api/ApiUser";
import FilterGroupGlobal, {
  ListSelectOptionType,
} from "@app/components/FilterGroupGlobal";
import {useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";

interface DataType {
  key: string;
  userId: number;
  name: string;
  avatar: string;
  address: string;
  description: string;
  transport: string;
  phoneNumber: string;
  roleName: any;
  isLocked: boolean;
}

export function ManagerUser(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUserInit, setDataUserInit] = useState<any>([]);
  const [paramFilter, setParamFilter] = useState<string>("");
  const [modal, contextHolder] = Modal.useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const displayedData = dataUserInit.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const user = useSelector((state: IRootState) => state.user);
  // console.log("user", user?.userInformationDto?.roleName);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const banOrUnbanUserMutate = useMutation(ApiUser.banOrUnbanUser);

  const getDataListUser = (): Promise<IGetListUser> =>
    ApiUser.getAllUser({
      page: 1,
      size: 10,
      role: paramFilter,
    });

  const {refetch} = useQuery(["GET_DATE_LIST_USER"], getDataListUser, {
    onSuccess: (res) => {
      console.log("RES USER", res?.data);
      setDataUserInit(res?.data?.content ?? []);
    },
  });

  const handleBanOrUnbanUser = (userId?: number) => {
    if (userId) {
      banOrUnbanUserMutate.mutate(
        {
          userId: userId,
        },
        {
          onSuccess: () => {
            refetch();
            notification.success({
              message: "Phê duyệt thành công!",
            });
          },
        }
      );
    }
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
  };

  useEffect(() => {
    refetch();
  }, [paramFilter]);

  const listSelectOption: ListSelectOptionType[] = [
    {
      title: "Vai trò",
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
          value: "Manager",
          label: "Quản lý",
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
      width: 70,
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
      title: "Số điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
      width: 110,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 170,
    },
    {
      title: "Địa chỉ",
      dataIndex: "defaultAddress",
      key: "defaultAddress",
      align: "center",
      width: 150,
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
          {dataIndex.roleName === "admin" ? (
            <div>Quản trị viên</div>
          ) : undefined}
          {dataIndex.roleName === "manager" ? <div>Quản lí</div> : undefined}
          {dataIndex.roleName === "employee" ? <div>Nhân viên</div> : undefined}
          {dataIndex.roleName === "renter" ? <div>Khách hàng</div> : undefined}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isLocked",
      key: "isLocked",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, dataIndex) => {
        return (
          <div>
            {!dataIndex?.isLocked ? (
              <Tag color="green">Hoạt động</Tag>
            ) : (
              <Tag color="magenta">Bị cấm</Tag>
            )}
          </div>
        );
      },
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
            {user?.userInformationDto?.roleName === "admin" ? (
              <Tooltip title={!dataIndex?.isLocked ? "Ban user" : "Unban User"}>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                  onClick={async () => {
                    const confirmed = await modal.confirm({
                      title: "Xác nhận",
                      content: (
                        <span>
                          {!dataIndex?.isLocked
                            ? "Bạn có muốn khoá người dùng này"
                            : "Bạn có muốn mở khoá người dùng này"}
                        </span>
                      ),
                      onOk: () => {
                        handleBanOrUnbanUser(dataIndex.userId);
                      },
                    });
                  }}
                >
                  <SyncOutlined
                    style={{
                      fontSize: 22,
                      color: !dataIndex?.isLocked ? "red" : "green",
                    }}
                  />
                </div>
              </Tooltip>
            ) : (
              <Tooltip title="Chỉ có admin mới có quyền">
                <StopOutlined
                  style={{
                    fontSize: 22,
                    color: "red",
                  }}
                />
              </Tooltip>
            )}
          </div>
        );
      },
      width: 80,
    },
  ];
  const listInputUser = [
    {
      title: "Tên người dùng",
      placeHolder: "Nhập tên người dùng",
      type: "input",
    },
    {
      title: "Ảnh đại diện",
      placeHolder: "Nhập tên người dùng",
      type: "uploadFile",
    },
    {
      title: "Email",
      placeHolder: "Nhập Email",
      type: "input",
    },
    {
      title: "Sách còn lại",
      placeHolder: "Nhập số sách còn lại",
      type: "input",
    },
    {
      title: "Số đơn giao dịch",
      placeHolder: "Nhập số đơn",
      type: "input",
    },
  ];

  return (
    <div className="manager-user-container">
      <FilterGroupGlobal listSelectOption={listSelectOption} />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 800, y: 550}}
        columns={columns}
        dataSource={displayedData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: dataUserInit.length, // Tổng số phần tử
          onChange: (page) => setCurrentPage(page),
        }}
      />
      <Modal
        title="Sửa thông tin người dùng"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={{}}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
          // validationSchema={LoginValidation}
        >
          {({handleSubmit}): JSX.Element => {
            return (
              <div>
                {listInputUser.map((item, index) => (
                  <div key={index}>
                    {item.type === "input" && (
                      <div
                        style={{
                          marginBottom: 12,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{width: "20%"}}>{`${item.title}:  `}</span>
                        <InputGlobal
                          name="username"
                          placeholder={item.placeHolder}
                          style={{width: "80%"}}
                          onPressEnter={(): void => handleSubmit()}
                        />
                        <ErrorMessageGlobal name="username" />
                      </div>
                    )}
                    {item.type === "uploadFile" && (
                      <div
                        style={{
                          marginBottom: 12,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{width: "20%"}}>{`${item.title}:  `}</span>
                        <div style={{width: "80%"}}>
                          <UploadFileGlobal
                            handleChange={() => console.log("uploadFile")}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          }}
        </Formik>
      </Modal>
      {contextHolder}
    </div>
  );
}
