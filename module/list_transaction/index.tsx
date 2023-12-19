import React, {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Modal, Table} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {Formik} from "formik";
import UploadFileGlobal from "@app/components/UploadFileGlobal";

interface DataType {
  key: string;
  name: string;
  avatar: string;
  address: string;
  description: string;
  transport: string;
  phoneNumber: string;
  total: string;
}

export function ListTransaction(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
  };
  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };
  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khóa: Tiêu đề",
    },
  ];
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
      render: (_, dataIndex) => <div>{data.indexOf(dataIndex) + 1}</div>,
    },
    {
      title: "Tên người dùng",
      dataIndex: "user_name",
      key: "name",
      width: 150,
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "image",
      render: (_, dataIndex) => (
        <div>
          <Image
            style={{borderRadius: 100}}
            width={100}
            height={100}
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
      title: "Email",
      key: "email",
      dataIndex: "description",
      align: "center",
      render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 100,
    },
    {
      title: "Ngày tạo",
      dataIndex: "time_created",
      key: "time_created",
      align: "center",
      width: 80,
    },
    {
      title: "Sách còn lại",
      dataIndex: "numberOfBook",
      key: "time_created",
      align: "center",
      width: 80,
    },
    {
      title: "Số đơn giao dịch",
      dataIndex: "transactions",
      key: "time_created",
      align: "center",
      width: 80,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: () => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onClick={showModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{marginLeft: 8}}>
            <EditOutlined style={{fontSize: 22, color: "blue"}} />
          </div>
        </div>
      ),
      fixed: "right",
      width: 50,
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
  const data: any = [
    {
      user_name: "Nguyễn văn A",
      avatar:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      email: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      numberOfBook: 200,
      transactions: 120,
    },
    {
      user_name: "Nguyễn văn B",
      avatar:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      email: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      numberOfBook: 200,
      transactions: 120,
    },
    {
      user_name: "Nguyễn văn C",
      avatar:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      email: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      numberOfBook: 200,
      transactions: 120,
    },
    {
      user_name: "Nguyễn văn D",
      avatar:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      email: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      numberOfBook: 200,
      transactions: 120,
    },
    {
      user_name: "Nguyễn văn E",
      avatar:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      email: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      numberOfBook: 200,
      transactions: 120,
    },
  ];

  return (
    <div className="manager-user-container">
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 1000, y: 500}}
        columns={columns}
        dataSource={data}
        pagination={false}
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
    </div>
  );
}
