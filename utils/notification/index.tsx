import {notification} from "antd";

export const notificationSuccess = (message: string) => {
  notification.success({
    message: message,
  });
};

export const notificationWarning = (message: string) => {
  notification.warning({
    message: message,
  });
};

export const notificationError = (message: string) => {
  notification.error({
    message: message,
  });
};
