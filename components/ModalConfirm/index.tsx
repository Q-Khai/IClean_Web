import {Modal} from "antd";

interface IModalConfirmProps {
  title: string;
  content?: string;
  onOK?: () => void;
}

const openModalConfirm = (props: IModalConfirmProps): void => {
  const {title, content, onOK} = props;
  Modal.confirm({
    title: title,
    content: content,
    onOk: onOK,
  });
};

export {openModalConfirm};
