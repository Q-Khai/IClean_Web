// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});

interface TextEditorProps {
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  onChange: (e: string) => void;
  defaultValue?: string;
  isColor?: boolean;
  isLink?: boolean;
  isImage?: boolean;
  isClean?: boolean;
  value?: string;
}

function TextEditorGlobal(props: TextEditorProps): JSX.Element {
  const {
    onChange,
    width,
    height,
    placeholder,
    isColor,
    isLink,
    isImage,
    isClean,
    value,
    defaultValue,
  } = props;

  const customArr = [];
  if (isLink) {
    customArr.push("link");
  }
  if (isImage) {
    customArr.push("image");
  }

  const modules = {
    toolbar: [
      [{size: []}],
      ["bold", "italic", "underline"],
      isColor ? [{color: []}] : undefined,
      [{align: []}],
      customArr.length > 0 ? [...customArr] : undefined,
      isClean ? ["clean"] : undefined,
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "color",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactQuill
      theme="snow"
      style={{width: width, height: height}}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}

export {TextEditorGlobal};
