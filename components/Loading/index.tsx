import {Spin} from "antd";
import {SpinProps} from "antd/lib/spin";

function LoadingGlobal(prop: SpinProps): JSX.Element {
  return <Spin {...prop} />;
}

export {LoadingGlobal};
