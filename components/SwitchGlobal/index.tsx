import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {Switch, SwitchProps} from "antd";

function SwitchCheckGlobal(prop: SwitchProps): JSX.Element {
  return (
    <Switch
      {...prop}
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
    />
  );
}

export {SwitchCheckGlobal};
