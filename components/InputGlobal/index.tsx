import "./index.scss";
import {Input, InputProps, Checkbox, CheckboxProps} from "formik-antd";

import {Button, Input as InputAntd} from "antd";
import {SearchProps} from "antd/lib/input";
import {LinkOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

interface InputLinkGlobalProps {
  onChange?: (value: string) => void;
  onSubmit: (value: any) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

function InputGlobal(props: InputProps): JSX.Element {
  return <Input {...props} />;
}

function InputAntdGlobal(props: InputProps): JSX.Element {
  return <InputAntd {...props} className="input-global" />;
}

function InputPasswordGlobal(props: InputProps): JSX.Element {
  return <Input.Password {...props} />;
}

function CheckboxGlobal(props: CheckboxProps): JSX.Element {
  return <Checkbox {...props} />;
}

function InputSearchGlobal(props: SearchProps): JSX.Element {
  const {Search} = InputAntd;
  return <Search {...props} />;
}

function InputLinkGlobal(props: InputLinkGlobalProps): JSX.Element {
  const {onChange, onSubmit, label, required, disabled, defaultValue} = props;

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="input-link-global">
      <div className="label-wrap">
        {required && <span className="required">* </span>}
        {label && <span>{label}</span>}
      </div>
      <InputAntd.Group compact>
        <InputAntd
          allowClear
          defaultValue={defaultValue}
          value={value}
          onChange={(e): void => {
            if (onChange) onChange(e.target.value);
            if (e.target.value.length === 0) onSubmit("");
            setValue(e.target.value);
          }}
          style={{width: "140px"}}
          disabled={disabled}
          prefix={<LinkOutlined style={{color: "#1890FF"}} />}
        />
        <Button
          type="primary"
          onClick={(): void => onSubmit(value)}
          style={{width: "70px"}}
          disabled={disabled}
        >
          Upload
        </Button>
      </InputAntd.Group>
    </div>
  );
}

export {
  InputGlobal,
  InputPasswordGlobal,
  CheckboxGlobal,
  InputSearchGlobal,
  InputLinkGlobal,
  InputAntdGlobal,
};
