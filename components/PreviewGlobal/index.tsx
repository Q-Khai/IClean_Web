import {EyeOutlined, PlayCircleOutlined} from "@ant-design/icons";
import checkTypeFile from "@app/utils/checkFileType";
import {Modal, Image} from "antd";
import {useState} from "react";
import ReactPlayer from "react-player";
import "./index.scss";

interface PreviewGlobalProps {
  link?: string;
}

function PreviewGlobal(props: PreviewGlobalProps): JSX.Element {
  const {link} = props;

  const typeLink = checkTypeFile(link);

  const [showPreview, setShowPreview] = useState(false);

  const openPreview = (): void => {
    setShowPreview(true);
  };

  const cancelPreview = (): void => {
    setShowPreview(false);
  };

  return (
    <div className="preview-global">
      {typeLink === "video" && (
        <ReactPlayer url={link} width="100%" height="auto" />
      )}
      {typeLink === "youtube" && (
        <ReactPlayer url={link} width="100%" height="auto" />
      )}
      {typeLink === "image" && (
        <Image
          width="100%"
          height="100%"
          src={
            link ??
            "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
          }
          preview={false}
        />
      )}
      {typeLink === "file" && (
        <Image
          width="100%"
          height="100%"
          src={
            link ??
            "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
          }
          preview={false}
        />
      )}

      <div className="overlay" onClick={openPreview} role="button">
        {typeLink === "video" && (
          <PlayCircleOutlined className="icon-preview" />
        )}
        {typeLink === "image" && <EyeOutlined className="icon-preview" />}
      </div>

      <Modal
        open={showPreview}
        footer={null}
        title=" "
        onCancel={cancelPreview}
      >
        {typeLink === "video" && (
          <ReactPlayer url={link} width="100%" height="auto" controls />
        )}
        {typeLink === "youtube" && (
          <ReactPlayer url={link} width="auto" height="500px" />
        )}
        {typeLink === "image" && (
          <Image
            width="auto"
            height="auto"
            src={
              link ??
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
            preview={false}
          />
        )}
        {typeLink === "file" && (
          <Image
            width="auto"
            height="auto"
            src={
              link ??
              "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
            }
            preview={false}
          />
        )}
      </Modal>
    </div>
  );
}

export default PreviewGlobal;
