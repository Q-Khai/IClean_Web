import {notification} from "antd";

function Success(message: string, description?: string, duration?: number) {
  return notification.success({
    message: message,
    description: description,
    duration: duration,
  });
}

function Error(message: string, description?: string, duration?: number) {
  return notification.error({
    message: message,
    description: description,
    duration: duration,
  });
}

export {Success, Error};
