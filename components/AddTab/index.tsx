import {Button, Col, Row} from "antd";
import {Input, InputProps, Select, SelectProps} from "formik-antd";
import {useRef, useState} from "react";

export function AddTabGlobal(props: InputProps): JSX.Element {
  const refInput = useRef<any>(null);
  const [dataValue, setDataValue] = useState<string[]>([
    "Tiếng Hàn 1",
    "Tiếng Hàn 2",
  ]);

  const options: SelectProps["options"] = [
    {
      label: "12",
      value: "12",
    },
    {
      label: "13",
      value: "13",
    },
  ];

  const handleChange = (e: string[]) => {
    setDataValue(e);
  };

  const addtab = (e: any) => {
    const data = dataValue;
    data.push(refInput.current.input.value);
    setDataValue(data);
    refInput.current.input.value = "";
    refInput.current.blur();
  };

  return (
    <div>
      <Row gutter={16} justify="space-between">
        <Col span={18}>
          <Input ref={refInput} {...props} onPressEnter={addtab} />
        </Col>
        <Col span={6}>
          {" "}
          <Button style={{width: "100%", backgroundColor: ""}} onClick={addtab}>
            add
          </Button>
        </Col>
      </Row>

      <Select
        allowClear
        className="custom"
        name={props.name + "select"}
        onChange={handleChange}
        mode="multiple"
        defaultValue={dataValue}
        value={dataValue}
        options={options}
      />
    </div>
  );
}
