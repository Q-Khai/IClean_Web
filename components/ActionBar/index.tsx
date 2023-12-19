import {Button} from "antd";
import "./index.scss";
import classNames from "classnames";

interface ActionBarProps {
  listAction: any[];
}

export function ActionBar(props: ActionBarProps): JSX.Element {
  const {listAction} = props;
  return (
    <div className="flex justify-end action-bar-container">
      {listAction.map((action, index) => (
        <Button
          type="primary"
          key={index}
          className={classNames(
            "button-container",
            index !== listAction.length - 1 && "mr-10"
          )}
          onClick={action.handleClick}
        >
          {action.title}
        </Button>
      ))}
    </div>
  );
}
