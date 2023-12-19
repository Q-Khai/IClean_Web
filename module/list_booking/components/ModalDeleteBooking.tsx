import React, {useRef, useState} from "react";
import {Select, Input, Modal, notification} from "antd";
import {
  getListRejectReason,
  IListRejectReasonRes,
  rejectAproveBooking,
} from "@app/api/ApiProduct";
import {useMutation, useQuery} from "react-query";
import {Formik} from "formik";
import {openModalConfirm} from "@app/components/ModalConfirm";

const {TextArea} = Input;
interface IProps {
  bookingId: number | undefined;
  handleCancel: any;
  isModalDeleteBooking: any;
  handleCancelModalViewDetail?: any;
  refetchListBooking?: any;
}

interface IListOptionReasonReject {
  value: number;
  label: string | number;
}
export function ModalDeleteBooking(props: IProps): JSX.Element {
  const formikRef = useRef<any>(null);
  const {
    bookingId,
    isModalDeleteBooking,
    handleCancel,
    handleCancelModalViewDetail,
    refetchListBooking,
  } = props;
  const [listRejectReason, setListRejectReason] = useState<
    IListOptionReasonReject[]
  >([]);

  const getDataRejectReason = (): Promise<IListRejectReasonRes> =>
    getListRejectReason();

  const {data} = useQuery(["GET_DATA_REJECT_REASON"], getDataRejectReason, {
    onSuccess: (res) => {
      const newArray: IListOptionReasonReject[] = [];
      // eslint-disable-next-line no-unused-expressions
      res?.data &&
        res.data.forEach((item) => {
          const newObject: IListOptionReasonReject = {
            value: item.rejectionReasonId ?? 1,
            label: item.rejectionReasonContent ?? "",
          };
          newArray.push(newObject);
        });

      setListRejectReason(newArray);
    },
  });

  console.log(data);
  const rejectBookingMutate = useMutation(rejectAproveBooking);

  const handleDeleteBooking = (data: any) => {
    if (
      data.rejectionReasonId.length === 0 ||
      data.rejectionReasonDetail.length === 0
    ) {
      notification.error({
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }

    if (bookingId) {
      rejectBookingMutate.mutate(
        {
          id: bookingId,
          action: "rejected",
          rejectionReasonId: data.rejectionReasonId,
          rejectionReasonDetail: data.rejectionReasonDetail,
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Từ chối đơn hàng thành công!",
            });
            handleCancel();
            handleCancelModalViewDetail();
            refetchListBooking();
          },
          onError: () => {
            notification.error({
              message: "Có lỗi xảy ra, vui lòng thử lại!",
            });
          },
        }
      );
    }
  };

  return (
    <div style={{marginTop: 10}}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          rejectionReasonId: "",
          rejectionReasonDetail: "",
        }}
        onSubmit={handleDeleteBooking}
        validateOnChange
        validateOnBlur
        // validationSchema={LoginValidation}
      >
        {({handleSubmit, handleChange, values, setFieldValue}): JSX.Element => {
          return (
            <Modal
              className="border_radius"
              title="Từ chối đơn hàng"
              okText="Từ chối"
              cancelText="Huỷ"
              okButtonProps={{
                style: {background: "red", color: "white", borderColor: "red"},
              }}
              open={isModalDeleteBooking}
              onOk={() => {
                openModalConfirm({
                  title: "Bạn có chắc chắn muốn xóa?",
                  onOK: () => {
                    handleSubmit();
                  },
                });
              }}
              onCancel={() => {
                handleCancel();
                formikRef?.current?.resetForm();
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 15,
                  marginTop: 5,
                }}
              >
                <div
                  style={{width: "35%", color: "#495057", fontWeight: "500"}}
                >
                  Loại lí do
                </div>
                <Select
                  placeholder="Chọn lí do"
                  style={{width: "100%"}}
                  value={values.rejectionReasonId}
                  onChange={(value) =>
                    setFieldValue("rejectionReasonId", value)
                  }
                  options={listRejectReason}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 15,
                  marginTop: 5,
                }}
              >
                <div
                  style={{width: "35%", color: "#495057", fontWeight: "500"}}
                >
                  Mô tả chi tiết
                </div>
                <TextArea
                  name="rejectionReasonDetail"
                  value={values.rejectionReasonDetail}
                  onChange={handleChange}
                  placeholder="Nhập chi tiết lí do"
                  autoSize={{minRows: 2, maxRows: 6}}
                />
              </div>
            </Modal>
          );
        }}
      </Formik>
    </div>
  );
}
