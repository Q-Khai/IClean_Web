import "./index.scss";
import {FormProps} from "antd";
import {
  DatePickerProps,
  Form,
  FormItemProps,
  Input,
  InputProps,
  SelectProps,
  Select,
  DatePicker,
  Cascader,
  RadioGroupProps,
  Radio,
  RangePickerProps,
  InputNumberProps,
  InputNumber,
  CascaderProps,
  TextAreaProps,
} from "formik-antd";
import {FormikFieldProps} from "formik-antd/lib/FieldProps";
import {TextAreaRef} from "antd/lib/input/TextArea";

function InputGlobal(props: InputProps): JSX.Element {
  return <Input {...props} className="input-global" />;
}

function InputTextArea(
  props: FormikFieldProps & TextAreaProps & React.RefAttributes<TextAreaRef>
): JSX.Element {
  return <Input.TextArea {...props} style={{height: 70, width: "100%"}} />;
}

function SelectGlobal(props: SelectProps): JSX.Element {
  return <Select {...props} />;
}
function CascaderGlobal(props: CascaderProps): JSX.Element {
  return <Cascader {...props} />;
}
function RadioGlobal(props: RadioGroupProps): JSX.Element {
  return <Radio.Group {...props} />;
}
function DatePickerGlobal(props: DatePickerProps): JSX.Element {
  return <DatePicker allowClear={false} {...props} format="DD-MM-YYYY" />;
}

function FormGlobal(props: FormProps): JSX.Element {
  return <Form layout="vertical" {...props} />;
}

function FormItemGlobal(props: FormItemProps): JSX.Element {
  return (
    <Form.Item hasFeedback {...props}>
      {props.children}
    </Form.Item>
  );
}

function RangePickerGlobal(prop: RangePickerProps): JSX.Element {
  return (
    <DatePicker.RangePicker
      {...prop}
      allowClear={false}
      style={{width: "100%"}}
    />
  );
}

function InputNumberGlobal(props: InputNumberProps): JSX.Element {
  return <InputNumber {...props} />;
}

function SelectMultiGlobal(props: SelectProps): JSX.Element {
  return <Select className="custom" allowClear mode="multiple" {...props} />;
}

export {
  FormGlobal,
  FormItemGlobal,
  InputGlobal,
  CascaderGlobal,
  RadioGlobal,
  SelectGlobal,
  DatePickerGlobal,
  RangePickerGlobal,
  InputNumberGlobal,
  SelectMultiGlobal,
  InputTextArea,
};
