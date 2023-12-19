import React, {useRef} from "react";
import {Input, Modal, notification} from "antd";
import {cancelApply} from "@app/api/ApiProduct";
import {useMutation} from "react-query";
import {Formik} from "formik";
import {openModalConfirm} from "@app/components/ModalConfirm";

const {TextArea} = Input;
interface IProps {
  handleCancel: any;
  isModalDeleteApply: any;
  idApply: number;
  isRefetch: any;
}

export function ModalDeleteApply(props: IProps): JSX.Element {
  const formikRef = useRef<any>(null);
  const {isModalDeleteApply, handleCancel, idApply, isRefetch} = props;

  const cancelApplyMutate = useMutation(cancelApply);

  const handleDeleteApply = (data: any) => {
    console.log("dayaa", data);
    if (data.reason.length === 0) {
      notification.error({
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }

    if (idApply) {
      cancelApplyMutate.mutate(
        {
          id: idApply,
          reason: data.reason,
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Từ chối đơn hàng thành công!",
            });
            handleCancel();
            isRefetch();
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
          reason: "",
        }}
        onSubmit={handleDeleteApply}
        validateOnChange
        validateOnBlur
      >
        {({handleSubmit, handleChange, values, setFieldValue}): JSX.Element => {
          return (
            <Modal
              className="border_radius"
              title="Từ chối đơn ứng tuyển"
              okText="Từ chối"
              cancelText="Huỷ"
              okButtonProps={{
                style: {background: "red", color: "white", borderColor: "red"},
              }}
              open={isModalDeleteApply}
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
                  Mô tả chi tiết
                </div>
                <TextArea
                  name="reason"
                  value={values.reason}
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
