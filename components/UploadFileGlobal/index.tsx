import React, {useState, useEffect, memo} from "react";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {Modal, Upload, Image, Button} from "antd";
import type {UploadFile, UploadProps} from "antd/es/upload";
import "./index.scss";

interface UploadFileGlobalProps {
  handleChange: (data: any | null | undefined) => void;
  label?: string;
  disabled?: boolean;
  url?: string;
  required?: boolean;
  type?: "image" | "file";
  error?: boolean;
}

function UploadFileGlobal(props: UploadFileGlobalProps): JSX.Element {
  const {
    handleChange,
    label,
    disabled,
    url,
    required,
    type = "image",
    error,
  } = props;

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const openPreview = (): void => {
    setShowPreview(true);
  };

  const cancelPreview = (): void => {
    setShowPreview(false);
  };

  useEffect(() => {
    if (url && url.length > 0) {
      setFileList([
        {
          uid: "-4",
          name: "image.png",
          status: "done",
          url: url,
        },
      ]);
    } else setFileList([]);
  }, [url]);

  const handleChangeFile: UploadProps["onChange"] = (info) => {
    handleChange(info.fileList[0]?.originFileObj);
    setFileList(info.fileList);
  };

  const handleDeleteFile = (): void => {
    handleChange(null);
  };

  const uploadButton = (
    <div>
      {type === "image" && (
        <div>
          <PlusOutlined />
          <div style={{marginTop: 8}}>Upload</div>
        </div>
      )}
      {type === "file" && (
        <div>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="upload-file-global">
      <div className="label">
        {required && <span className="required">* </span>}
        {label}
      </div>
      {error && <div className="error-mess">Hình ảnh không được để trống</div>}
      <Upload
        listType={type === "file" ? "picture" : "picture-card"}
        onChange={handleChangeFile}
        onRemove={handleDeleteFile}
        disabled={disabled || !!url}
        fileList={fileList}
        onPreview={(): void => {
          openPreview();
        }}
      >
        {fileList.length > 0 ? null : uploadButton}
      </Upload>

      <Modal
        open={showPreview}
        footer={null}
        title=" "
        onCancel={cancelPreview}
        style={{textAlign: "center"}}
      >
        <Image
          width="auto"
          height="500px"
          src={fileList?.[0]?.thumbUrl || fileList?.[0]?.url}
          preview={false}
        />
      </Modal>
    </div>
  );
}

export default memo(UploadFileGlobal);
