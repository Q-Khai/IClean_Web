import "./index.scss";
import {Button, Modal} from "antd";
import {ReactNode} from "react";

interface ModalGlobalProps {
  open: boolean;
  onOk?: () => void;
  onCancel: () => void;
  title: string;
  children: JSX.Element;
  textOK?: string;
  textCancel?: string;
  isLoadingOK?: boolean;
  footer?: null | ReactNode;
  width?: string | number;
}

interface IModalConfirmProps {
  children?: ReactNode;
  title: string;
  content?: string;
  onOk: () => void;
}

// modal
function ModalGlobal(props: ModalGlobalProps): JSX.Element {
  const {
    open,
    onOk,
    onCancel,
    title,
    children,
    textOK = "Xác nhận",
    textCancel = "Huỷ bỏ",
    isLoadingOK = false,
    footer,
    width = 850,
  } = props;
  return (
    <Modal
      centered
      title={<div style={{fontSize: "24px"}}>{title}</div>}
      width={width}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        footer || [
          <Button key="back" onClick={onCancel}>
            {textCancel}
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={isLoadingOK}
            onClick={onOk}
          >
            {textOK}
          </Button>,
        ]
      }
    >
      {children}
    </Modal>
  );
}

// modal confirm
function ModalConfirmGlobal(props: IModalConfirmProps): JSX.Element {
  const {title, content, onOk, children} = props;

  const openModal = (): void => {
    Modal.confirm({
      title: title,
      content: content,
      onOk: onOk,
    });
  };

  return (
    <button type="button" onClick={openModal}>
      {children}
    </button>
  );
}

export {ModalConfirmGlobal, ModalGlobal};
