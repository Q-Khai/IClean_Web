import {BulbOutlined} from "@ant-design/icons";
import {
  DatePickerGlobal,
  SelectGlobal,
  InputNumberGlobal,
  InputGlobal,
  SelectMultiGlobal,
} from "@app/components/FormGlobal";
import {Col} from "antd";
import {AddTabGlobal} from "../AddTab";

interface ListInputProps {
  data: any;
}

export function ListInputGlobal(props: ListInputProps): JSX.Element {
  const {data} = props;

  return (
    <div>
      {data.type === "input" && (
        <InputGlobal placeholder={data.placeholder} name={data.name} />
      )}

      {data.type === "autotext" && (
        <div>
          <Col span={16}>
            <div style={{color: "#8C8C8C"}}>
              <BulbOutlined style={{color: "#1890FF"}} />
              &nbsp; Tự động cấp sau đăng ký
            </div>
          </Col>
        </div>
      )}

      {data.type === "select" && (
        <SelectGlobal
          name={data.name}
          placeholder={data.placeholder}
          options={data.options}
        />
      )}

      {data.type === "date" && (
        <DatePickerGlobal name={data.name} style={{width: "100%"}} />
      )}

      {data.type === "number" && (
        <InputNumberGlobal name={data.name} placeholder={data.placeholder} />
      )}

      {data.type === "multiselect" && (
        <SelectMultiGlobal
          name={data.name}
          placeholder={data.placeholder}
          options={data.options}
        />
      )}

      {data.type === "addtab" && (
        <AddTabGlobal
          name={data.name}
          placeholder={data.placeholder}
          // options={data.options}
        />
      )}
    </div>
  );
}
