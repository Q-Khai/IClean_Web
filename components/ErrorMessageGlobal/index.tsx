import {ErrorMessage} from "formik";
import "./index.scss";

interface ErrorMessageGlobalProps {
  name: string;
}

function ErrorMessageGlobal(props: ErrorMessageGlobalProps): JSX.Element {
  const {name} = props;

  return (
    <ErrorMessage
      component="span"
      className="error-message-global"
      name={name}
    />
  );
}

export default ErrorMessageGlobal;
